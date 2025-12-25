import fs from 'fs';

const checkEventUSer = async (req, res, next) => {
  const eventBody = req.body;
  const name = eventBody.username;
  const password = eventBody.password;
  const users = JSON.parse(
    await fs.promises.readFile('./data/users.json', 'utf-8')
  );
  let foundUser = false;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === name && users[i].password === password) {
      foundUser = true;
    }
  }
  if (foundUser) {
    next();
  } else {
    res.status(401).send('You are not authorized to log in.');
  }
};
export default checkEventUSer;
