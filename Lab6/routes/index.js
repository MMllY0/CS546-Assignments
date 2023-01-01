const movieRoutes = require('./movies');
const reviewRoutes = require('./reviews');

const constructorMethod = (app) => {
    app.use('/movies', movieRoutes);
    app.use('/reviews', reviewRoutes);

    app.use('*', (req,res) => {
        res.status(404).json({error: 'Page Not found'});
    });
};

module.exports = constructorMethod;