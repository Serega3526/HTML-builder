const fs = require("fs")
const path = require("path")
const filePath = path.join(__dirname, "files")
const filePathNew = path.join(__dirname, "files-copy")

fs.mkdir(filePathNew, { recursive: true }, (err) => {
    if(err) {
        throw err
    }
})
fs.readdir(filePath, (error, files) => {  
    if (error) return console.log(error);
    files.forEach((file) => {
        fs.copyFile(path.join(__dirname, "files", file), path.join(__dirname, "files-copy", file), (err) => {
            if (err) {
                console.log("Error Found:", err);
            }
        });
    });
});

