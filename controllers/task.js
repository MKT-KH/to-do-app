const Task = require('../models/task');

exports.postTask = (req, res, next) => {
    const name = req.body.name;
    const task = new Task({
        name: name
    });

    task.save().then(result => {
        console.log('task save ');
        res.status(201).json({
            task: result
        });
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
        console.log(err)
    });
};


exports.getTasks = (req, res, next) => {
    Task.find().then(tasks => {
        res.status(200).json({
            message: 'tasks found',
            tasks: tasks
        })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }

        // console.log(err)
    })

};

exports.deleteTask = (req, res, next) => {
    const taskId = req.params.taskId;
    let task;
    Task.findById(taskId).then(task => {
        if (!task) {
            res.status(501).json({
                message: 'no task found with that id'
            })
        };
        task = task;
        return Task.findByIdAndRemove(taskId)

    }).then(result => {

        res.json({
            task: task
        })
        console.log('deleted task')
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    });




};

exports.editTask = (req, res, next) => {
    const taskId = req.params.taskId;
    const updatedTitle = req.body.name;
    const updatedComplted = req.body.completed;

    Task.findById(taskId).then(task => {
            task.name = updatedTitle;
            task.completed = updatedComplted;
            return task.save()
        }).then(task => {
            res.json({
                task: task
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
                next(err);
            }
        })

}