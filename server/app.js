import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/auth', userRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Application listening on port ${PORT}`);
});
