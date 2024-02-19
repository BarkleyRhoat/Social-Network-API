const express = require('express');
const db = require("./config/connection");
const routes = require("./routes");
const {User} = require("./models/user.js")
// const seed = require("/seeds/mainSeeds.js")

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(routes);

db.once('open', async () => {
    // await seed();
    app.listen(PORT, async () => {
        
        // await User.create({username: "franklin", email: "whatever@gmail.com"})
        console.log (`API running on port ${PORT}!`)
    });
});