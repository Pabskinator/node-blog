const express = require('express');
const morgan = require('morgan');

// express app - creating an instance of express
const app = express();

// register view engine - EJS
app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);

// middleware - sample
// app.use((req, res, next) => {
//     console.log('new request made:');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     next();
// });

// middleware & static files (images, css)
app.use(express.static('public'));

// 3rd party middleware - morgan logger
app.use(morgan('dev'));

app.get('/', (req, res) => {
    // res.send('<p>Home Page</p>'); // sending inline html
    // res.sendFile('./views/index.html', { root: __dirname }); // sending a html file
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ];

    res.render('index', {
        title: 'Home', blogs
    }); // rendering ejs file
});

app.get('/about', (req, res) => {
    // res.send('<p>About Page</p>'); // sending inline html
    // res.sendFile('./views/about.html', { root: __dirname }); // sending a html file
    res.render('about', {
        title: 'About'
    }); // rendering ejs file
});

app.get('/blogs/create', (req, res) => {
    res.render('create', {
        title: 'Create'
    }); // rendering ejs file
})

// redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

// 404 page
app.use((req, res) => {
    // res.status(404).sendfile('./views/404.html', { root: __dirname }); // sending a html file
    res.status(404).render('404', {
        title: '404'
    }); // rendering ejs file
})