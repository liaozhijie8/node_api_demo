const { execSQL } = require("../db/index");
const getList = (author, keyword) => {
  //从数据拿去数据
  let sql = `select * from blog where 1=1 `;
  if (author) {
    sql += `and author='${author}'`;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%'`;
  }
  console.log(sql);
  // 返回的是一个promise 不是一个数据需要.then使用
  return execSQL(sql);
};
/* 登录 */
const userLogin = (usernmae,password)=>{
  const promise = new Promise((resolve,reject)=>{
    if(usernmae==='leon'&&password==='1234567'){
      resolve('登录成功')
    }else{
      reject('登录失败')
    }
  })
  return promise
  let sql = `select * from blog where author='${usernmae}'`;
  console.log(sql)
  return execSQL(sql);
}
/* 获取文章详情 */
const getDetail = (id) => {
  let sql = `select * from blog where id='${id}'`;
  return execSQL(sql);
};
/* 新建文章 */
const createNewBlog = (blogData) => {
  const title = blogData.title
  const content = blogData.content
  const author = blogData.author
  const date = Date.now()
  const createAt = date
  const sql = `insert into blog (title,content,author,createAt) value ('${title}','${content}','${author}',${createAt})`
  return execSQL(sql).then(res=>{
    return '更新成功'
  })
}
/* 更新文章 */
const updateBlog = (id, blogData) => {
  const title = blogData.title;
  const content = blogData.content
  let sql = `update blog set title='${title}',content='${content}' where id=${id}`;
  return execSQL(sql).then(res=>{
    console.log(res)
    if(res.changedRows===0){
      return false
    }else return true
  })
}
/* 删除文章 */
const deteleBlog = (id) => {
  return true;
};
module.exports = {
  getList,
  getDetail,
  createNewBlog,
  updateBlog,
  deteleBlog,
  userLogin
};
