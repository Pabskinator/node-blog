// **************************************************************************************************************** //

// FILE SYSTEM

const fs = require('fs');

// read files - async
fs.readFile('./docs/blog1.txt', (err, data) => {
    if (err) {
        console.log(err);
    }
    console.log(data.toString());
});

// write files - async
fs.writeFile('./docs/blog1.txt', 'hello, world', () => {
    console.log('file was written');
})

// directories
if(!fs.existsSync(`./assets`)) {
    fs.mkdir('./assets', (err) => {
        if(err){
            console.log(err);
        }
        console.log('folder created');
    })
}else{
    fs.rmdir('./assets', (err) => {
        if(err){
            console.log(err)
        }
    })
}

// deleting files
if(fs.existsSync('./docs/deleteMe.txt')){
    fs.unlink('./docs/deleteMe.txt', (err) => {
        if(err){
            console.log(err);
        }
        console.log('file deleted');
    })
}