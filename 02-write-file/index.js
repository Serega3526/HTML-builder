const fs = require("fs")
const path = require("path")
const { stdin,stdout } = process

const filePath = path.join(__dirname, "text.txt")
fs.writeFile(filePath, "", err => {
    if (err) {
        throw err
    }
    stdout.write("Write the text\n")
    stdin.on("data", (data) => {
        fs.appendFile(filePath, data, err => {
            if (err) {
                throw err
            }
        })
    })
})
process.on("SIGINT", () => {
    stdout.write("Good luck!")
    process.exit()
})