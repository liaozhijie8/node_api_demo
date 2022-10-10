const handleBlogRoute = require("./src/routes/blog");
const querystring = require("querystring");
/* 处理post数据 */
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== "POST") {
      resolve({});
      return;
    }
    if (req.headers["content-type"] !== "application/json") {
      resolve({});
      return;
    }
    let postData = "";
    req.on("data", (chunk) => {
      postData += chunk.toString();
    });
    req.on("close", () => {
      if (!postData) {
        resolve({});
        return;
      }
      resolve(JSON.parse(postData));
    });
  });
  return promise;
};
const serverHandler = (req, res) => {
  /* 获取path */
  const url = req.url;
  req.path = url.split("?")[0];
  /* 获取query */
  req.query = querystring.parse(url.split("?")[1]);
  res.setHeader("Content-type", "application/json");
  getPostData(req).then((postData) => {
    req.body = postData;
    const blogDataPromise = handleBlogRoute(req, res);
    if (blogDataPromise) {
      blogDataPromise.then((blogData) => {
        if(blogData.message==='登录成功'){
          res.setHeader('Set-Cookie','username=leon')
        }
        res.end(JSON.stringify(blogData));
      });
      return;
    }
    /* 未匹配到任何路由 */
    res.writeHead(404, { "content-Type": "text/plain" });
    res.write("404 Not Found");
    res.end();
  });
};

module.exports = serverHandler;
