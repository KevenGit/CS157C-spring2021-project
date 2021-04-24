const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://midterm:5VOTsiSCnFMLmcar@cluster0.3voc6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then(result => {
    console.log('MongoDB Connected!');
    const port = 3000;
    app.listen(port, () => {console.log(`Connecting on port ${port}`)});
})
.catch(err => {
    console.error(err);
    process.exit(1);
});

app.use(express.urlencoded({extended: true}));

app.use('/articles', require('./routes/articleRoutes'));

app.get('/', (req, res) => {
    // res.send('Hello, this is the CS157C project!');
    res.sendFile('./views/index.html', {root: __dirname});
});