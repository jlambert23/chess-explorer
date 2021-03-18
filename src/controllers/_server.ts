import * as mongoose from 'mongoose';

export async function connect() {
  await mongoose.connect('mongodb://localhost/chess-explorer', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  console.log('established connection');
  return;
}
