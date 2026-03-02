const mongoose = require('mongoose');

const PageContentSchema = new mongoose.Schema({
    page: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    sections: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('PageContent', PageContentSchema);
