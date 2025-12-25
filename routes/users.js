import express from 'express';
import fs from 'fs';

const users = express();

users.post('/tickets/buy', async (req, res) => {
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
});
export default users;
