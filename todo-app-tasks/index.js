const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

async function displayHomepage (request, response) {
    const connection = await mongoClient.connect('mongodb://root:password@localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true});
    const db = connection.db('todo-app');
    const results = await db.collection('todo-tasks').find({}).toArray();
    console.log(results);
    const data = {results: results};
    response.render('home', data);
}

async function getUncompletedTasks (request, response) {
    // get uncompleted tasks to display
    const connection = await mongoClient.connect('mongodb://root:password@localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true});
    const db = connection.db('todo-app');
    const results = await db.collection('todo-tasks').find({"completed": {$exists: false}}).toArray();
    console.log(results);
    return response.json(results);
}

async function getCompletedTasks (request, response) {
    // get completed tasks
    const connection = await mongoClient.connect('mongodb://root:password@localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true});
    const db = connection.db('todo-app');
    const results = await db.collection('todo-tasks').find({"completed": {$exists: true}}).toArray();
    console.log(results);
    return response.json(results);
}

async function addNewTask (request, response) {
    // creates a new task
    console.log(request.body);
    if ("task" in request.body) {
        const connection = await mongoClient.connect('mongodb://root:password@localhost:27017', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db = connection.db('todo-app');
        const results = await db.collection('todo-tasks').insertOne({"task": request.body.task});
        if (results.insertedCount == 1) {
            response.json({
                "message": "success",
                "boolean": true
            })
        } else {
            response.json({
                "message": "failure",
                "boolean": false
            })
        }
    } else {
        response.json({
            "message": "failure",
            "boolean": false
        })
    }
}

async function updateTaskToCompleted (request, response) {
    // mark task as completed
    const connection = await mongoClient.connect('mongodb://root:password@localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true});
    const db = connection.db('todo-app');
    const results = await db.collection('todo-tasks').updateOne({_id: ObjectId(request.params.id)}, {$set: {completed: true}});
    if (results.modifiedCount == 1) {
        response.json({
            "message": "success",
            "boolean": true
        })
    } else {
        response.json({
            "message": "failure",
            "boolean": false
        })
    }
}

async function setTaskToDeleted (request, response) {
    // sets task deleted key to true
    const connection = await mongoClient.connect('mongodb://root:password@localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true});
    const db = connection.db('todo-app');
    const results = await db.collection('todo-tasks').updateOne({_id: ObjectId(request.params.id)}, {$set: {deleted: true}});
    console.log(results);
    if (results.modifiedCount == 1) {
        response.json({
            "message": "success",
            "boolean": true
        })
    } else {
        response.json({
            "message": "failure",
            "boolean": false
        })
    }
}

module.exports.displayUncompletedTasks = displayHomepage;
module.exports.getUncompletedTasks = getUncompletedTasks;
module.exports.getCompletedTasks = getCompletedTasks;
module.exports.addNewTask = addNewTask;
module.exports.updateTaskToCompleted = updateTaskToCompleted;
module.exports.setTaskToDeleted = setTaskToDeleted;
