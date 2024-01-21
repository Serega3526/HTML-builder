const fs = require("fs")
const path = require("path")
const filePath = path.join(__dirname, "styles")

fs.open(path.join(__dirname, "project-dist", "bundle.css"), 'w', (err) => {
    if(err) throw err;
    console.log('File created');
});
fs.readdir(filePath, { withFileTypes: true }, (err, files) => {
    if (err) throw err
    files.forEach(file => {
        if (err) throw err
        if(file.isFile() && path.extname(file.name) === '.css') {
            fs.readFile(path.join(__dirname, "styles", file.name), (err, content) => {
                if (err) throw err
                fs.appendFile(path.join(__dirname, "project-dist", "bundle.css"), content, err => {
                    if (err) throw err
                })
            })
        }
    })
})
