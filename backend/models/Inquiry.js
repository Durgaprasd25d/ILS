const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, default: 'New' }
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', InquirySchema);
