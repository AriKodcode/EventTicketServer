import express from 'express';
import checkUserName from '../middleware/checkUserName.js';
import fs from 'fs';

const users = express();

users.post('/tickets/buy', checkUserName, async (req, res) => {
  try {
    const userBody = req.body;
    const events = JSON.parse(
      await fs.promises.readFile('./data/events.json', 'utf-8')
    );
    for (let i = 0; i < events.length; i++) {
      if (events[i].eventName === userBody.eventName) {
        if (events[i].ticketsAvailable >= userBody.quantity) {
          const receipts = JSON.parse(
            await fs.promises.readFile('./data/receipts.json', 'utf-8')
          );
          receipts.push({
            username: userBody.username,
            eventName: userBody.eventName,
            ticketsBought: userBody.quantity,
          });
          events[i].ticketsAvailable -= userBody.quantity;
          fs.promises.writeFile(
            './data/events.json',
            JSON.stringify(events, null, 2),
            'utf-8'
          );
          fs.promises.writeFile(
            './data/receipts.json',
            JSON.stringify(receipts, null, 2),
            'utf-8'
          );
          res.status(200).send('You have successfully bought tickets.');
        }
        res.status(404).send('There are not enough tickets.');
      }
    }
    res.status(404).send('No event found.');
  } catch (error) {
    console.error(error.messgae);
  }
});

users.get('/:username/summary', async (req, res) => {
  try {
    const name = req.params.username;
    const receipts = JSON.parse(
      await fs.promises.readFile('./data/receipts.json', 'utf-8')
    );
    for (let i in receipts) {
      if (receipts[i].username === name) {
        let total = 0;
        const allEvents = [];
        let avgTicketPerEvent = 0;
        const userName = req.params.username;
        for (let i in receipts) {
          if (receipts[i].username === userName) {
            total += receipts[i].ticketsBought;
            allEvents.push(receipts[i].eventName);
          }
        }
        avgTicketPerEvent = total / allEvents.length;
        res.status(200).json({
          totalTicketsBought: total,
          events: allEvents,
          averageTicketsPerEvent: avgTicketPerEvent,
        });
      }
    }
    res.status(404).json({
      totalTicketsBought: 0,
      events: [],
      averageTicketsPerEvent: 0,
    });
  } catch (error) {
    console.error(error.messgae);
  }
});
export default users;
