const express = require('express');
const db = require('./config/connection');
//const htmlRoutes = require('./routes/htmlRoutes')
const path = require('path');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');


const app = express();
const PORT = process.env.PORT 

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
console.log(process.env.PORT);

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

const helpers = require('./utils/helpers');

const hbs = exphbs.create({ helpers });

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, '/public')));

// app.use('/html', htmlRoutes);


/* db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');

}); */





// turn on routes
app.use(routes);


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});