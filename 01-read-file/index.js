const fs = require("fs")
const path = require("path")
const filePath = path.join(__dirname, 'text.txt')
const stream = fs.createReadStream(filePath, "utf-8")
let data = ""
stream.on("data", (content) => console.log(content))