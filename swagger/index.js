const express = require('express');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const swaggerDocument = require('./swagger.json');

const app = express();
const port = 4000;

app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Swagger UI доступен по адресу: http://localhost:${port}/api-docs`);
}); 