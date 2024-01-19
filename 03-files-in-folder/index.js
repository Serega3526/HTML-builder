const fs = require("fs")
const path = require("path")
const filePath = path.join(__dirname, "secret-folder")

fs.readdir(filePath, { withFileTypes: true }, (err, files) =>{
    console.log("\nCurrent files:"); 
  if (err) 
    console.log(err); 
  else { 
    files.forEach(file => { 
      if(file.isFile()){
        const fileName = file.name.slice(0, file.name.indexOf('.'))
        const fileExtension = file.name.slice(file.name.indexOf('.') + 1)
        let fileSize = ''
        fs.stat(path.join(__dirname, "secret-folder", file.name), (err, stats) => {
            if (err) {
                throw err
            }
            fileSize = `${(stats.size / 1024).toFixed(2)}kb`
            console.log(`${fileName} - ${fileExtension} - ${fileSize}`)
        })
         
      }
    }) 
  } 
})