const routesAPIRoutes = require('./routesAPI');

const constructorMethod = (app) => {
    app.use('/', routesAPIRoutes);
    app.use('*', (req, res) => {
        res.sendStatus(404).json({error:'page not found'});
    });
};

module.exports = constructorMethod;
