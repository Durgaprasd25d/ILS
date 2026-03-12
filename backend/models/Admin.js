const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Method to compare password
AdminSchema.methods.comparePassword = async function(candidatePassword) {
    return candidatePassword === this.password;
};

module.exports = mongoose.model('Admin', AdminSchema);
