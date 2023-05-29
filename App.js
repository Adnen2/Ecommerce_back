const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productRoute = require('./routes/product.route');
const categoryRoute = require('./routes/category.route');
const userRouter=require('./routes/user.route');
const orderRouter=require('./routes/order.route');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connexion à la base de données réussie');
}).catch(err => {
  console.log('Impossible de se connecter à la base de données', err);
  process.exit();
});
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Routes
app.use('/api/products', productRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/orders', orderRouter);
app.use('/api/users', userRouter);

app.get('/', (req, res) => {
  res.send('Bonjour Les Enfants');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on : http://127.0.0.1:${process.env.PORT}`);
});

module.exports = {
  app
};
