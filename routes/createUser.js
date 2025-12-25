import express from 'express';
import fs from 'fs';

const user = express();

user.post('/', async (req, res) => {
  try {
    const userBody = req.body;
    const data = JSON.parse(
      await fs.promises.readFile('./data/users.json', 'utf-8')
    );
    data.push(userBody);
    fs.promises.writeFile(
      './data/users.json',
      JSON.stringify(data, null, 2),
      'utf-8'
    );
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error.message);
  }
});

export default user;
