import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/routes';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Application listening on port ${PORT}`);
});


export default app;
