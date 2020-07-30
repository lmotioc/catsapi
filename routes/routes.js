// import other routes
const catRoutes = require('./cats');

const appRouter = (app, fs) => {

    // default route
    app.get('/', (req, res) => {
        res.send('welcome to the development api-server');
    });

    // // other routes
    catRoutes(app, fs);

};

module.exports = appRouter;