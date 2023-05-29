const mongoose = require("mongoose")
const categorySchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true,
        required: true
    },
})
module.exports = mongoose.model('category', categorySchema)