const express = require('express');
const app = express();
const mongoClient = require('mongodb').MongoClient;
const expressHandlebars = require('express-handlebars');
const cors = require('cors');
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectId;
const tasks = require('./todo-app-tasks');

const jsonParser = bodyParser.json();

app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.use(cors({origin: '*', optionsSuccessStatus: 200}));
app.options('*', cors({origin: '*', optionsSuccessStatus: 200}));

app.get('/', tasks.displayUncompletedTasks)

app.get('/completed-tasks', tasks.getCompletedTasks)

app.get('/task', tasks.getUncompletedTasks)

app.post('/task', jsonParser, tasks.addNewTask)

app.put('/task/:id', tasks.updateTaskToCompleted)

app.delete('/task/:id', tasks.setTaskToDeleted)

app.listen(3000);
