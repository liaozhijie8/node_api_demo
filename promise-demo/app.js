const http = require('http')
const server = http.createServer((req,res)=>{
  const cookieStr = req.headers
  console.log(cookieStr)
  res.end('弄好')
}).listen(8000,()=>{
  console.log('启动成功')
})