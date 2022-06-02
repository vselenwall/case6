import express from 'express';
import ejs from 'ejs';
import eventController from './controllers/eventController.js';
import eventModel from "./models/eventModel.js";


// "app" environment
// -------------------------
const app = express();

// variables
// -------------------------
const port = 3000;

// set template engine to ejs
// -------------------------
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/index', eventController.createEvent);

app.get('/', eventController.getAllEvents);

app.delete('/events/:id', eventController.removeEvent);

app.put('/events/:id', eventController.updateEvent);

app.get('/index/api', eventController.getAllEventsApi);

// ##### HANDLE ROUTES #####

app.get('/start', (req, res) => {
   
    // processa innehållet från en ejs fil
    res.render('start');
});

app.get('/create', (req, res) => {
   
    // processa innehållet från en ejs fil
    res.render('create');
});

app.get('/index', (req, res) => {
   
    // processa innehållet från en ejs fil
    res.render('index');
});

// route request
// -------------------------
app.get('/', (req, res) => {
    res.render('index');
});


// serve static files
// -------------------------
app.use(express.static('public'));

// handle errors
// -------------------------

// 404 not found
// -------------------------
app.get('*', (req, res, next) => {
    res.render('404');
});

// server error 500...
// -------------------------
 app.use((err, req, res, next) => {

    // show response
    return res.status(500).send("Server error, please return later");
});

// start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});