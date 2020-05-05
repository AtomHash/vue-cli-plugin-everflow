import { Page, decorators } from 'everflow';

@decorators.Component({})
export default class LoginPage extends Page
{
    pageName = 'Login';
    routeName = '';

    ready()
    {
        console.log('Login Page');
    }
}
