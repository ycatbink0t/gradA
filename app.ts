import express from 'express';
import config from './config.json';
import cookieParser from 'cookie-parser';

import me from './routes/me';

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/me', me);

app.listen(config.app.port, _ => {
    console.log('Server listening on port ', config.app.port);
});
