const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
        doctor: [{type: mongoose.Types.ObjectId, ref: 'Doctor'}],
        patient: [{type: mongoose.Types.ObjectId, ref: 'Patient'}],
        date: {
            type: String,
            required: true,
        },
        slot_no: {
            type: Number,
            required: true,
            min: [0, "invalid slot"],
            max: [7, "invalid slot"]
        },
    },

    { timestamps: true }
);

bookingSchema.index({ doctor: 1, date: 1, slot_no: 1 }, { unique: true });

module.exports = mongoose.model("Booking", bookingSchema);
