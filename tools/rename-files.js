const fs = require('fs')
const files = fs.readdirSync(`${__dirname}/../public/images`)
let count = 0
for (const file of files) {
  if(file !== '.DS_Store' && file.indexOf(count) >= 0 && count <= 43) {
    console.log(`${file} becomes ${__dirname}/../public/images/${count}`)    
    count = count + 1
  }
  
}