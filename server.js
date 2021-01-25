// **************************************************************************************************************** //

// CREATE SERVER

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    // set header content type
    res.setHeader('Content-Type', 'text/html');

    // basic routing
    let path = './views/';

    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    // writing response - inline html
    // res.write('<p>hello, droids!</p>');
    // res.write('<p>hello again, droids!</p>');

    // read a file and send the data
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err)
            res.end();
        } else {
            // res.write(data); // use this if you're sending multiple data
            res.end(data); // use this for only one data
        }
    })
});

// listen to server requests
server.listen(3000, 'localhost', () => {
    console.log('listening for request on port 3000');
});

