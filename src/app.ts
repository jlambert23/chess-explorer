import * as cors from 'cors';
import * as express from 'express';

import { connect } from './controllers/_server';
import routes from './routes/index';

const url = 'localhost';
const port = 3000;
const app = express();
app.use(cors());
routes(app);

app.listen(port, async () => {
  console.log(`application listening on ${url}:${port}`);
  try {
    await connect();
  } catch (ex) {
    console.log('failed to connect to database!');
    console.log(ex);
  }
});
