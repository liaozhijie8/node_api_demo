const http = require('http')
const serverHandler = require('../app')
const PORT = 5000

const server = http.createServer(serverHandler).listen(PORT,()=>{
  console.log(`服务器运行在${PORT}`)
})