import fs from 'fs';

const checkExistingUser = async (req, res, next) => {
  const userBody = req.body;
  const lenbody = Object.keys(userBody);
  if (userBody['username'] && userBody['password'] && lenbody.length === 2) {
    const data = JSON.parse(
      await fs.promises.readFile('./data/users.json', 'utf-8')
    );
    let found = false;
    for (let i = 0; i < data.length; i++) {
      if (data[i]['username'] === userBody['username']) {
        found = true;
      }
    }
    if (!found) {
      next();
    } else {
      res.status(401).send('A user already exists in the system.');
    }
  } else {
    res.status(401).send('Missing matching fields');
  }
};
export default checkExistingUser;
