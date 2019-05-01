import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import debug from 'debug';
import routes from './routes/routes';
import swaggerUI from 'swagger-ui-express';
import swaggerdoc from './../swagger';


const app = express();
const debugg = debug('app');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "*",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS",
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);

app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(cors());
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerdoc));
routes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  debugg(`Application listening on port ${PORT}`);
});


export default app;
