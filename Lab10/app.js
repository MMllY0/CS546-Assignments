const express = require('express');
const app = express();
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');
const session = require('express-session');
const static = express.static(__dirname + '/public');
app.use('/public', static);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true
  }));

app.use(async (req, res, next) => {
    let authenticated = '';
    if (req.session.user) {
        authenticated = 'Authenticated User'
    } else {
        authenticated = 'Non-Authenticated User';
    }
    const currentDate = new Date().toUTCString();
    console.log(currentDate, req.method, req.originalUrl, authenticated);
    next()
})

app.use('/protected', (req, res, next) => {
    if(!req.session.user) {
        return res.status(403).render('forbiddenAccess', {document_title: 'forbiddenAccess'})
    } else {
        next();
    }
})

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');    
})