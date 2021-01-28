const express = require('express');
const morgan = require('morgan');
const {connect} = require('mongoose');

// importing models
const Blog = require('./models/blog');

// express app - creating an instance of express
const app = express();

// database connect to mongodb atlas
const dbURI = 'mongodb+srv://droid:test123@nodeblog.rupom.mongodb.net/node_blog?retryWrites=true&w=majority'

// connect to db using mongoose
connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        // listen for requests
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    })

// register view engine - EJS
app.set('view engine', 'ejs');

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

// middleware to accept post request data
app.use(express.urlencoded({ extended: true }));

// 3rd party middleware - morgan logger
app.use(morgan('dev'));

// mongoose and mongo sandbox routes

// adding a blog
// app.get('/add-blog', (req, res) =>{
//     const blog = new Blog({
//         title: 'New Blog',
//         snippet: 'All about my new blog',
//         body: 'More about my new blog'
//     });
//
//     blog.save()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// })
//
// // get all blog documents from collection
// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// })
//
// // get a single blog
// app.get('/single-blog', (req, res) => {
//     Blog.findById('6011422338eee80b709da820')
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// })

// ROUTES

app.get('/', (req, res) => {
    // res.send('<p>Home Page</p>'); // sending inline html
    // res.sendFile('./views/index.html', { root: __dirname }); // sending a html file

    // Basic routing

    // const blogs = [
    //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    // ];
    //
    // res.render('index', {
    //     title: 'Home', blogs
    // }); // rendering ejs file

    res.redirect('/blogs');

});

app.get('/about', (req, res) => {
    // res.send('<p>About Page</p>'); // sending inline html
    // res.sendFile('./views/about.html', { root: __dirname }); // sending a html file
    res.render('about', {
        title: 'About'
    }); // rendering ejs file
});

// BLOG ROUTES

// get all blogs
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', {
                title: 'All Blogs',
                blogs: result
            })
        })
        .catch((err) => {
            console.log(err);
        })
})

// create a blog
app.get('/blogs/create', (req, res) => {
    res.render('create', {
        title: 'Create'
    }); // rendering ejs file
})

// save a blog
app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then(() => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err);
        })
})

// get a single blog
app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('details', {
                blog: result,
                title: 'Blog Details'
            })
        })
        .catch((err) => {
            console.log(err);
        })
})

// delete
app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({
                redirect: '/blogs',
            });
        })
        .catch((err) => {
            console.log(err);
        })
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