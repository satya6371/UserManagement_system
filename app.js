require("dotenv").config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const  flash  = require('connect-flash');
const session = require("express-session");
const connectDB = require("./server/config/db");
const methodOverride = require('method-override')

const app = express();
const port = 5000 || process.env.PORT;

// Connect to DataBase
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'))

// Static Files
app.use(express.static("public"));

// Express Session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 7, // 1 week
    },
  })
);

// Flash Message
app.use(flash({sessionKeyName: 'flashMessage'}))

// Template Engine
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// Routes
app.use("/", require("./server/routes/customer"));

// Handle Error
app.get("*", (req, res) => {
  res.status(404).render("404");
});

// Server
app.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
