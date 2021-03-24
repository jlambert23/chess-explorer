import * as mongoose from 'mongoose';

export async function connect(dropDatabase = false) {
  await mongoose.connect('mongodb://localhost/chess-explorer', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  console.log('established connection');

  if (dropDatabase) {
    await timeout(250);
    await mongoose.connection.dropDatabase();
    console.log('dropped database');
  }
}

async function timeout(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
