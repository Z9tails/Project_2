const express = require('express');
const db = require('./db/connection');
const htmlRoutes = require('./routes/htmlRoutes')

const PORT = process.env.PORT || 3001
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));

app.use('/html', htmlRoutes);


db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
});