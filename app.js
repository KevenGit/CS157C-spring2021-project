const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello, this is the CS157C project!');
})

const port = 3000;
app.listen(port, () => {console.log(`Connecting on port ${port}`)});