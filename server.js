const express = require('express');
const fs = require('fs');
const handlebars = require('hbs');

const port = process.env.PORT || 3000;
const app = express();

app.use((req, res, next) =>{
    let now = new Date().toString();
    let log = `${now}:  ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n'
        , err => { if (err) console.log('Unable to append to server.log') });
    next();
});

//Un-comment when the site is under maintenance to block all requests
// app.use((req, res, next) =>{
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs');
handlebars.registerPartials(__dirname + '/views/partials');
handlebars.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
handlebars.registerHelper('screamIt', (text1, text2) => {
    return `${text1.toUpperCase()} ${text2.toUpperCase()}`;
});

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!!!</h1>');
    res.render('home.hbs',
            {
                pageTitle: 'Home Page',
                welcomeMessage: 'Welcome to my express website!'
            }
        );
});

app.get('/about', (req, res) => {
    res.render("about.hbs",
        {
            pageTitle: 'About Page',
        });
});

app.get('/projects', (req, res) => {
    res.render("projects.hbs",
        {
            pageTitle: 'GitHub Portfolio',
        });
});

app.get('/bad', (req, res) => {
    res.send(
        {
            errorMessage: '404 bad request'
        });
});

app.listen(port, () => {
    console.log('Node app started on port: ', port)
});