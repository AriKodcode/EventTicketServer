import express from 'express';
import fs from 'fs';

const createEvent = express();

createEvent.post('/', async (req, res) => {
  try {
    const eventBody = req.body;
    const bodyLen = Object.keys(eventBody);
    if (
      eventBody.eventName &&
      eventBody.ticketsForSale &&
      eventBody.username &&
      eventBody.password &&
      bodyLen.length === 4
    ) {
      const data = JSON.parse(
        await fs.promises.readFile('./data/events.json', 'utf-8')
      );
      const newEvent = {
        eventName: eventBody.eventName,
        ticketsAvailable: eventBody.ticketsForSale,
        createdBy: eventBody.username,
      };
      data.push(newEvent);
      fs.promises.writeFile(
        './data/events.json',
        JSON.stringify(data, null, 2),
        'utf-8'
      );
      res.status(200).send('event created successfully');
    }
    res.status(404).send('Missing matching fields');
  } catch (error) {
    console.error(error.message);
  }
});

export default createEvent;
