import express from 'express';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import routes from './routes/routes';



const app = express();
const swaggerDocument = YAML.load(`${process.cwd()}/swagger.yaml`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

routes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Application listening on port ${PORT}`);
});


export default app;
