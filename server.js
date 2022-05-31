import express from 'express';
import ejs from 'ejs';
import eventController from './controllers/eventController.js';
//import eventModels from './models/eventModels.js';
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

// TEST //
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//app.get('/search', quoteController.searchQuote);
app.post('/index', eventController.createEvent);
//app.put('/default/:title', eventController.updateQuote);


app.get('/', eventController.getAllEvents);

app.delete('/events/:id', eventController.removeEvent);

app.put('/events/:id', eventController.updateEvent);

app.get('/index/api', eventController.getAllEventsApi);

// ##### HANDLE ROUTES #####
// LISTEN TO /START
app.get('/start', (req, res) => {
   
    // processa innehållet från en ejs fil
    res.render('start');
});

app.get('/create', (req, res) => {
   
    // processa innehållet från en ejs fil
    res.render('create');
});


app.use((req, res, next) => {
    res.locals.myNameIs = "Johan";
    next()
});

// LISTEN TO /INDEX
app.get('/index', (req, res) => {
   
    // processa innehållet från en ejs fil
    res.render('index', {greeting: 'Hello'});
});




// middleware (use param next...)
// -------------------------
// ...

// handle requests
// -------------------------


// use route modules
/*import routeStart from './routes/start.js';
app.use('/start', routeStart);

import routeDefault from './routes/default.js';
app.use('/default', routeDefault);*/


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
/* app.get('*', (req, res, next) => {
    res.render('404');
}); */

// server error 500...
// -------------------------
/* app.use((err, req, res, next) => {

    // show response
    return res.status(500).send("Server error, please return later");
}); */

// TESTING // 


let result = eventModel.getEvents();
console.log(result);

// start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});