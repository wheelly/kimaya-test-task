import mongoose from 'mongoose';
import l from '../common/logger';

const connectDb = async () => {
  mongoose.set('debug', true);
  const dbname = process.env.TEST_DB_URL;
  await mongoose.connect(dbname, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
  });
  l.info(`Connected to ${dbname}`);
  let db = mongoose.connection;
  //db.client.setLogLevel(5, 'query')

  try {
    await db.dropCollection('articles');
  } catch (err) {
    l.warn(`Drop collection error: ${err}`);
  }
};

module.exports = connectDb;
