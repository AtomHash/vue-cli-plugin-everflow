import { Page, decorators } from 'everflow';

@decorators.Component({})
export default class HomePage extends Page
{
    pageName = 'Home';
    routeName = '';

    ready()
    {
        console.log('Welcome Home, Triggered on this pages load.');
    }
}
