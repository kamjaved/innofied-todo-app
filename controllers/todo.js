const Todo = require('../model/todo');


exports.getTodos = async (req, res, next) => {
    Todo.find()
        .then(data => res.json(data))
        .catch(next)
};


exports.getTodobyId = async (req, res, next) => {
    Todo.findOne({ _id: req.params.id })
        .then(data => res.json(data))
        .catch(next)
}



exports.addTodo = async (req, res, next) => {

    if (req.body.todo) {
        Todo.create(req.body)
            .then(data => res.json(data))
            .catch(next)
    } else {
        res.json({
            error: "The input field is empty!"
        })
    }
};


exports.updateTodo = async (req, res, next) => {
    Todo.findByIdAndUpdate(req.params.id,
        {
            todo: req.body.todo,
            isCompleted: req.body.isCompleted
        }, (err, docs) => {
            if (err) {
                res.json(err);
            }
            return res.json(docs)
        })
};

exports.deleteTodo = (req, res, next) => {
    Todo.findOneAndDelete({ '_id': req.params.id })
        .then(data => res.json(data))
        .catch(next)
};
