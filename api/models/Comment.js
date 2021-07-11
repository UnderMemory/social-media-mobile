const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    PostId: {
        type: String,
        required: true,
    },
    UserId: {
        type: String,
    },
    contain: {
        type: String,
        max: 2000,
    },
    date: {
        type: Date,
        default: [],
    },
},
{timestamps: true}
);

module.exports = mongoose.model("Comment", CommentSchema);