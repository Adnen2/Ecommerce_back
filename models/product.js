const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  subtitle: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  size: {
    type: mongoose.Schema.Types.Mixed
  },
  image: {
    type: [String],
    validate: {
      validator: function (value) {
        return value.every(url => {
          return url.startsWith('http') || (url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.jpeg'));
        });
      },
      message: props => `${props.value} is not a valid image URL`
    }
  },
  images: [{
    type: String,
    validate: {
      validator: function (value) {
        return value.startsWith('http') || (value.endsWith('.png') || value.endsWith('.jpg') || value.endsWith('.jpeg'));
      },
      message: props => `${props.value} is not a valid image URL`
    }
  }],
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value.startsWith('http') || (value.endsWith('.png') || value.endsWith('.jpg') || value.endsWith('.jpeg'));
      },
      message: props => `${props.value} is not a valid image URL`
    }
  },
  original_price: {
    type: Number
  },
  slug: {
    type: String,
    unique: true
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
