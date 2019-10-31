const express = require('express');

const routerTest = express.Router();
const app = express();

routerTest.route('/hi')
            .get((req, res) => {
                return res.send("hi");
            });
app.use('/api', routerTest);

app.get('/', (req, res) => {
    res.send('Welcome here');
});

app.listen(8082, () => {
    console.log(`running`);
});