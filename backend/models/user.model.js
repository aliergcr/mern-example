const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: 'String',
            required: true,
            unique: true,
            trim: true,
            minLength: 3,
        },
    },
    {
        timestamps: true,
    },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
