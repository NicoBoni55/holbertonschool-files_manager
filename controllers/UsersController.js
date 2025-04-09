import sha1 from 'sha1';
import DBClient from '../utils/db';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    try {
      const userExist = await DBClient.db.collection('users').findOne({ email });
      if (userExist) {
        return res.status(400).json({ error: 'Already exist' });
      }
      const hashedPass = sha1(password);
      const result = await DBClient.db.collection('users').insertOne({ email, password: hashedPass });
      return res.status(201).json({ id: result.insertedId, email });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default UsersController;
