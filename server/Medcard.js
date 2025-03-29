const mongoose = require('mongoose');

const medcardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    registrationType: { type: String, enum: ['online', 'offline'], default: 'online' },
    symptoms: { type: [String], default: [] },
    medications: { type: [String], default: [] },
    date: { type: Date, required: true },
    confirm:{type:Boolean,default:false},
    doctorId: { type: String, required: true }
});

const Medcard = mongoose.model('Medcard', medcardSchema);

module.exports = Medcard;