const mongoose = require("mongoose")
var userSchema = mongoose.Schema({
    nom: {
        type: String,
        required: "nom is required"
    },

    email: {
        type: String,
        required: "Email is required",
        unique: true
    },
    password: {
        type: String,
        required: "password is required"
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    avatar : {
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
});
module.exports = mongoose.model('User', userSchema) 