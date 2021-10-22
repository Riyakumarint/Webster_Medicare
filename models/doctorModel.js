const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25
    },
    speciality: {
        type: String,
        required: true,
    },
    degree: {
        type: String,
        required: true,
    },
    experience: {
        type: Number,
        required: true
    },
    consultationFees: {
        type: Number,
        required: true,
    },
    consultsCount: {
        type: Number,
        required:true,
    },
    rating: {
        type: Number,
        required: true,
    }
}, 
{
    timestamps: true
})

module.exports = mongoose.model('Doctor', doctorSchema)