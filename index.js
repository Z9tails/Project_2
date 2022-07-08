const express = require('express');
const db = require("./config/connection");
const htmlRoutes = require('./routes/htmlRoutes')
const session = require("express-session");
const exphbs = require("express-handlebars");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const PORT = process.env.PORT || 3001
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));

// app.use('/html', htmlRoutes);


/* db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');

}); */


const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
app.use(session(sess));

const helpers = require("./utils/helpers");

const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(require("./controllers/"));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});