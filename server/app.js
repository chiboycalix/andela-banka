import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import userRoute from './routes/userRoute';
import accountRoutes from './routes/accountRoutes';
import transactionRoutes from './routes/transactionRoutes';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/accounts', accountRoutes);
app.use('/api/v1/transactions', transactionRoutes);
app.get('/', (request, response) => {
  return response.status(200).json({
    status: 200,
    message: 'Welcome to banka',
  });
});
app.use('*', (request, response) => {
  return response.status(404).json({
    status: 404,
    error: "404 NOT FOUND",
  });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Application listening on port ${PORT}`);
});


export default app;
