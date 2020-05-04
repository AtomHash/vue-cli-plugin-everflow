import { App, models } from 'everflow'
import routes from './router/routes';
var config = require('./config.js');

export module Application
{
    /*
        *** INIT EVERFLOW APP ***
        Create an everflow application with config and usermodel, then load routes.
        */
    const app = new App(models.UserModel, config, []);
    app.run(routes);
}
