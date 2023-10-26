const path = require("path");

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://192.168.145.28:8001",
        pathRewrite: { "/api": "" },
        changeOrigin: true
      }
    }
  },
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
};
export {};
