const mongoose = require('mongoose');

const ConsultationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    serviceType: { type: String, required: true },
    projectType: { type: String },
    budget: { type: String },
    timeline: { type: String },
    message: { type: String },
    status: { type: String, default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Consultation', ConsultationSchema);
