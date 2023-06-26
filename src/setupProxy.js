// const createProxyMiddleware = require('http-proxy-middleware');

const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function(app) {
//   app.use(
//     '/test',
//     createProxyMiddleware({
//       target: 'https://trm-f25f811b26e8.herokuapp.com',
//       changeOrigin: true,
//     })
//   );
// };




const proxy = {
  target: 'https://api.levelnine.biz',
  changeOrigin: true,
};
module.exports = function (app) {
  app.use('/rs-test', createProxyMiddleware(proxy));
};
