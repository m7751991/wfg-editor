const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "/editer/dist/",
  chainWebpack: (config) => {
    config.resolve.alias.set("@", resolve("./src"));
  },
};
