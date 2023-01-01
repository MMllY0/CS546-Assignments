const peopleRoutes = require('./people');
const path = require('path');

const constructorMethod = (app) =>{

    app.get('/', (req, res) => {
        res.sendFile(path.resolve('static/homepage.html'));
    })
    app.use('/', peopleRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({error: " Not Found"});
    })
};

module.exports = constructorMethod;