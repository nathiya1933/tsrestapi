import express from 'express';
import swaggerUi from 'swagger-ui-express';
import productRoutes from './routes/product.routes';
import swaggerDocument from './swagger_output.json';



const app = express();

app.use(express.json());
app.use('/products', productRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
