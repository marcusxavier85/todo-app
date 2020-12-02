const express = require('express');
const app = express();
const mongoClient = require('mongodb').MongoClient;
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectId;
const tasks = require('./todo-app-tasks');

const jsonParser = bodyParser.json();

app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', async (request, response) => {
    const connection = await mongoClient.connect('mongodb://root:password@localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true});
    const db = connection.db('todo-app');
    const results = await db.collection('todo-tasks').find({}).toArray();
    console.log(results);
    const data = {results: results};
    response.render('home', data);
})

app.get('/completed-tasks', tasks.getCompletedTasks)

app.get('/task', tasks.getUncompletedTasks)

app.post('/task', jsonParser, tasks.addNewTask)

app.put('/task/:id', tasks.updateTaskToCompleted)

app.delete('/task/:id', tasks.setTaskToDeleted)

app.listen(3000);
