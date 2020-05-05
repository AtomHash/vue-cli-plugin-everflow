import { App, models } from 'everflow'
import routes from './router/routes';
import everflowConfig from './evconfig.json';

/******************************************************************************
    *** EVERFLOW APP ***
    Create an everflow application with config and usermodel, then load routes.
*******************************************************************************/
const app = new App(models.UserModel, everflowConfig, []);
app.run(routes);
