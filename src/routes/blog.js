const {
  getList,
  getDetail,
  createNewBlog,
  updateBlog,
  deteleBlog,
  userLogin
} = require("../controllers/blog");
const { SuccessModel, ErrorModel } = require("../model/responseModel");

const handleBlogRoute = (req, res) => {
  const id = req.query.id;
  const blogData = req.body;
  /* 登录路由 */
  if(req.method === "GET" && req.path === "/api/login"){
    const username = req.query.username
    const password = req.query.password
    const userLoginPromise = userLogin(username,password)
    return userLoginPromise.then(res=>{
      return new SuccessModel(res)
    }).catch(err=>{
      return new ErrorModel(err)
    })
  }
  /* 查看文章列表 */
  if (req.method === "GET" && req.path === "/api/blog/list") {
    const author = req.query.author || "";
    const keyword = req.query.keyword || "";
    let listDataPromise = getList(author, keyword);
    return listDataPromise.then((res) => {
      if (res.length == 0) {
        return new SuccessModel("没有找到该文章");
      } else {
        return new SuccessModel(res);
      }
    });
  }
  /* 查看文章细节 */
  if (req.method === "GET" && req.path === "/api/blog/detail") {
    let detailDataPromise = getDetail(id);
    return detailDataPromise.then((res) => {
      if (res.length == 0) {
        return new SuccessModel("没有找到该文章");
      } else {
        return new SuccessModel(res);
      }
    });
  }
  /* 更新文章 */
  if (req.method === "POST" && req.path === "/api/blog/update") {
    const updateBlogDataPromise = updateBlog(id, blogData);
    return updateBlogDataPromise.then(res=>{
      if (res) {
        return new SuccessModel("文章数据更新成功");
      } else {
        return new ErrorModel("文章数据更新失败")
      }
    })
    
  }
  /* 新建文章 */
  if (req.method === "POST" && req.path === "/api/blog/new") {
    const newBlogDataPromise = createNewBlog(blogData);
    return newBlogDataPromise.then(res=>{
      return new SuccessModel(res);
    }).catch(err=>{
      console.log(err)
    })
    
  }
  /* 删除文章 */
  if (req.method === "POST" && req.path === "/api/blog/detele") {
    const deteleBlogData = deteleBlog(id);
    if (deteleBlogData) {
      return new SuccessModel("文章删除成功");
    } else {
      return new ErrorModel("文章删除失败");
    }
  }
};

module.exports = handleBlogRoute;
