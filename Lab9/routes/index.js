const sortArrayRoutes = require('./sortArray');

const constructorMethod = (app) => {

    app.use('/', sortArrayRoutes)
    app.use('*', (req,res) => {
        res.redirect('/');
    })
};

module.exports = constructorMethod;