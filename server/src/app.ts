import * as cors from 'cors';
import * as express from 'express';

import connect from './controllers/_server';
import routes from './routes/index';

const port = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.json());
routes(app);

connect();

app.listen(port, () => console.log(`application listening on port ${port}`));
