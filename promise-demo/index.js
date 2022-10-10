const fs = require('fs')
const path = require('path')

function getFileContent(filename,callback){
  /* 文件的绝对路径 */
  const fullFilename = path.resolve(__dirname,'data',filename)
  fs.readFile(fullFilename,(err,data)=>{
    if(err){
      console.error(err)
      return
    }
    /* 回调函数 */
    callback(JSON.parse(data.toString()))
  })
}

/* getFileContent('a.json',(data)=>{
  console.log(data.message)
  getFileContent(data.next,(data)=>{
    console.log(data.message)
    getFileContent(data.next,(data)=>{
      console.log(data.message)
    })
  })
}) */

function getFileContentPromise(filename){
  const promise = new Promise((resolve,rejects)=>{
    /* 文件的绝对路径 */
  const fullFilename = path.resolve(__dirname,'data',filename)
  fs.readFile(fullFilename,(err,data)=>{
    if(err){
      rejects(err)
      return
    }
    resolve(JSON.parse(data.toString()))
  })
  })
  return promise
}
/* getFileContentPromise('a.json').then(res=>{
  console.log(res)
  return getFileContentPromise(res.next)
}).then(res=>{
  console.log(res)
  return getFileContentPromise(res.next)
}).then(res=>{
  console.log(res)
}) */
/* async await */
async function getFileContentAsync(){
  try{
    const p1 = await getFileContentPromise('a.json')
    console.log(p1)
    const p2 = await getFileContentPromise(p1.next)
    console.log(p2)
    const p3 = await getFileContentPromise(p2.next)
    console.log(p3)
  } catch(error){
    console.log(error)
  }
}
getFileContentAsync()