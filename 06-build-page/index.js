const fs = require("fs")
const path = require("path")


fs.mkdir(path.join(__dirname, "project-dist"), { recursive: true }, (err,files) => {
    if(err) {
        throw err
    }
    console.log("папка создана")
    fs.mkdir(path.join(__dirname, "project-dist", "assets"), { recursive: true }, (err,files) => {
        if(err) {
            throw err
        }
        console.log("папка создана")
        fs.open(path.join(__dirname, "project-dist", "index.html"), 'w', (err) => {
            if(err) throw err;
            console.log('File created');
            let contentTemplate = ''
            fs.readFile(path.join(__dirname, "template.html"), (err, content) => {
                if (err) throw err
                contentTemplate = content.toString()
                fs.readdir(path.join(__dirname, 'components'), { withFileTypes: true }, (err, components) => {
                    if (err) throw err
                    components.forEach((element, index, array) => {
                        fs.readFile(path.join(__dirname, 'components', element.name), (err, data) => {
                            if (err) throw err
                            let tempComponent = element.name.slice(0, element.name.indexOf('.'))
                            contentTemplate = contentTemplate.replace(`{{${tempComponent}}}`, data.toString())
                            if (index === array.length - 1) {
                                fs.writeFile(path.join(__dirname, "project-dist", "index.html"), contentTemplate, err => {
                                    if (err) throw err
                                })
                            }
                        })
                    });
                })
            })
        });
        fs.open(path.join(__dirname, "project-dist", "style.css"), 'w', (err) => {
            if(err) throw err;
            console.log('File created');
            

            /* STYLE*/

            fs.readdir(path.join(__dirname, "styles"), { withFileTypes: true }, (err, files) => {
                if (err) throw err
                files.forEach(file => {
                    if (err) throw err
                    if(file.isFile() && path.extname(file.name) === '.css') {
                        fs.readFile(path.join(__dirname, "styles", file.name), (err, content) => {
                            if (err) throw err
                            fs.appendFile(path.join(__dirname, "project-dist", "style.css"), content, err => {
                                if (err) throw err
                            })
                        })
                    }
                })
            })

            /*ASSETS*/

            fs.readdir(path.join(__dirname, "project-dist", "assets"), (error, files) => {
                if (error) return console.log(error);
                console.log("папка очищена")
                fs.readdir(path.join(__dirname, "assets"), (error, files) => {  
                    if (error) return console.log(error);
                    files.forEach((file) => {
                        fs.mkdir(path.join(__dirname, "project-dist", "assets", file), { recursive: true }, (err,files) => {
                            if(err) {
                                throw err
                            }
                            console.log("папка создана")
                        })
                        fs.readdir(path.join(__dirname, "assets", `${file}`), (err, content) => {
                            if (err) throw err
                            content.forEach(item => {
                                fs.copyFile(path.join(__dirname, "assets", `${file}`, `${item}`), path.join(__dirname, "project-dist", "assets", `${file}`, `${item}`), (err) => {
                                    if (err) {
                                        console.log("Error Found:", err);
                                    }
                                    return
                                });
                            })
                        })
                    });
                    console.log("файлы соззданы")
                });
            })
        });
    })
    
})



