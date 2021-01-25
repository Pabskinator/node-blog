const express = require('express');

// express app - creating an instance of express
const app = express();

// register view engine - EJS
app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);

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