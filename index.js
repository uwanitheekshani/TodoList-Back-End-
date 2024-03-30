const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')
const functions = require("firebase-functions")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/test')

app.get('/get',(req,res) =>{
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.get('/description/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findById(id)
        .then(todo => {
            if (todo) {
                res.json({ description: todo.description });
            } else {
                res.status(404).json({ error: 'Todo not found' });
            }
        })
        .catch(err => res.status(500).json({ error: 'Internal server error' }));
});

app.put('/update/:id', (req,res) => {
    const {id} = req.params;
    TodoModel.findByIdAndUpdate({_id: id}, {status: true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id', (req,res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.post('/add',(req,res) => {
    const task = req.body.task;
    const description = req.body.description;
    TodoModel.create({
        task: task,
        description: description
    }).then(result => res.json(result))
    .catch(err => res.json(err))
})
app.listen(3001, () => {
    console.log("Server is Running");

})

exports.api = functions.https.onRequest(app)