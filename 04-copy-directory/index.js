const fs = require("fs")
const path = require("path")
const filePath = path.join(__dirname, "files")
const filePathNew = path.join(__dirname, "files-copy")

fs.mkdir(filePathNew, { recursive: true }, (err,files) => {
    if(err) {
        throw err
    }
    console.log("папка создана")
})
fs.readdir(filePathNew, (error, files) => {
    if (error) return console.log(error);
    for (const file of files) {
        fs.unlink(path.join(__dirname, "files-copy", file), (err) => {
          if (err) throw err;
        });
    }
    console.log("папка очищена")
    fs.readdir(filePath, (error, files) => {  
        if (error) return console.log(error);
        files.forEach((file) => {
            fs.copyFile(path.join(__dirname, "files", file), path.join(__dirname, "files-copy", file), (err) => {
                if (err) {
                    console.log("Error Found:", err);
                }
            });
        });
        console.log("файлы соззданы")
    });
})


