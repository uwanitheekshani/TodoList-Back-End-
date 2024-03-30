const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    task: String,
    description: String,
    status: {
        type: Boolean,
        default: false
    }
})

const TodoModel = mongoose.model("todos", TodoSchema)
module.exports = TodoModel