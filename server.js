//INITIALIZE SERVER
const express = require('express');
const path = require("path");
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, './app/public')));

app.use(require(path.join(__dirname,"./app/routing/apiRoutes")));
app.use(require(path.join(__dirname,"./app/routing/htmlRoutes")));

//MAKE SERVER LISTEN ON PORT
app.listen(PORT,function() {
    console.log("Server is listening on port: " + PORT);
})