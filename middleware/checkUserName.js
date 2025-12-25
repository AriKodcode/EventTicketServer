import fs from 'fs';

const checkUserName = async (req, res, next) => {
  const checkUser = req.body;
  const users = JSON.parse(
    await fs.promises.readFile('./data/users.json', 'utf-8')
  );
  let found = false;
  for (let i = 0; i < users.length; i++) {
    if (
      users[i].username === checkUser.username &&
      users[i].password === checkUser.password
    ) {
      found = true;
      next();
    }
  }
  if (!found) {
    res.status(401).send('User does not exist.');
  }
};

export default checkUserName;
