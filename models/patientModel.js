const mongoose = require('mongoose')


const patientSchema = new mongoose.Schema(
    {
        firstname: 
        {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        mobile: {
            type: Number,
            required: true,
        },
        age: {
            type: String,
            required: true,
        },
    },
        {
            timestamps: true,
        }
);

module.exports = mongoose.model("Patient", patientSchema);
