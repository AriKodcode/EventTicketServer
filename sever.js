import express from 'express';
import user from './routes/createUser.js';
import checkExistingUser from './middleware/checkExistingUser.js';
import createEvent from './routes/createEvent.js';
import checkEventUSer from './middleware/checkEventUser.js';
import users from './routes/users.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/user/register', checkExistingUser, user);
app.use('/creator/events', checkEventUSer, createEvent);
app.use('/users', users);

app.listen(PORT, () => {
  console.log('server run... on port: ', PORT);
});
