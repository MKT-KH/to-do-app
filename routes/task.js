const express = require('express');

const router = express.Router();
const taskHandelres = require('../controllers/task');

router.post('/tasks', taskHandelres.postTask);
router.get('/tasks', taskHandelres.getTasks);
router.delete('/tasks/:taskId', taskHandelres.deleteTask);
router.patch('/tasks/:taskId', taskHandelres.editTask);

module.exports = router;