/** @format */

import mongoose from 'mongoose';

const certificateSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    totalScore: {
        type: Number,
        required: true,
    },
    percentage: {
        type: Number,
        required: true,
    },
});

const Certificate = mongoose.model('Certificate', certificateSchema);

export default Certificate;
