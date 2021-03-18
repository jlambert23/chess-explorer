import * as mongoose from 'mongoose';

export async function connect(dropTables = false) {
  await mongoose.connect('mongodb://localhost/chess-explorer', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  console.log('established connection');

  if (dropTables) {
    await mongoose.connection.collections['pgnlookups'].drop();
    console.log('dropped pgnlookups');
  }

  return;
}
