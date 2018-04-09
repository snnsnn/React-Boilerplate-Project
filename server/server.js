const express = require("express");
const app = express();

const config = {
  port: process.env.port || 3000
};

app.use(express.static('public'));

app.listen(config.port, function() {
  console.log("Express server is running on http://localhost:" + config.port);
});
