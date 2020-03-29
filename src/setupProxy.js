const proxy = require("http-proxy-middleware");

let url;

if (process.env.NODE_ENV === "production") {
  url = "https://pacific-island-46723.herokuapp.com";
} else {
  url = "http://localhost:3001";
}

module.exports = function(app) {
  app.use(proxy(["/api", "/auth/google"], { target: url }));
};
