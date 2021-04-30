import * as mongoose from 'mongoose';

const db = process.env.DB || 'localhost';
const port = process.env.DB_PORT || '27017';
const url = `mongodb://${db}:${port}/chess-explorer`;
const options: mongoose.ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

export default function connect(dropDatabase = false) {
  try {
    _connect(dropDatabase);
  } catch (ex) {
    console.log('failed to connect to database!');
    console.log(ex);
  }
}

async function _connect(dropDatabase: boolean) {
  await mongoose.connect(url, options);
  console.log(`established connection to db: ${url}`);

  if (dropDatabase) {
    await timeout(250);
    await mongoose.connection.dropDatabase();
    console.log('dropped database');
  }
}

async function timeout(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
