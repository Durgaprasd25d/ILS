const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true }, // e.g., 'home.hero'
    label: { type: String, required: true },
    isEnabled: { type: Boolean, default: true },
    type: { type: String, enum: ['page', 'section', 'component'], default: 'page' },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Permission', default: null }
}, { timestamps: true });

module.exports = mongoose.model('Permission', PermissionSchema);
