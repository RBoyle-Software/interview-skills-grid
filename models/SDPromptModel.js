const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SDPromptSchema = new Schema({
    promptName: {
        type: String,
        required: true
    },
    promptContent: {
        type: String,
        required: true
    },
    promptType: {
        type: String,
        required: true
    },
    promptDifficulty: {
        type: String,
        required: true
    }
    promptSource: {
        type: Array,
        required: true
    },
    promptSample: {
        type: Array,
        required: false
    },
    promptLink: {
        type: String,
        required: false
    },
    created_at: {
        type: Date,
        default: Date.now(),
        required: true
    }
});


const SDPrompt = new mongoose.model('sdPrompts', SDPromptSchema);

module.exports = { SDPromptSchema };