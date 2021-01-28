const express = require('express');

// express router
const router = express.Router();

// import controller
const {
    blog_create_get,
    blog_create_post,
    blog_delete,
    blog_details,
    blog_index
} = require('../controllers/blogController');

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

// BLOG ROUTES

// get all blogs
router.get('/blogs', blog_index);

// create a blog
router.get('/blogs/create', blog_create_get);

// get a single blog
router.get('/blogs/:id', blog_details);

// save a blog
router.post('/blogs', blog_create_post);

// delete
router.delete('/blogs/:id', blog_delete);

module.exports = router;