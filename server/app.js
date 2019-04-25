import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/routes';
import swaggerUI from 'swagger-ui-express';
import swaggerdoc from './../swagger';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerdoc));
routes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Application listening on port ${PORT}`);
});


export default app;
