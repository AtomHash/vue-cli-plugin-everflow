import { Page, decorators } from 'everflow';
import HelloWorld from '../../components/hello-world.vue';
import Home from '../../classes/home';

@decorators.Component({
    components: {
    'hello-world': HelloWorld}
})
export default class HomePage extends Page
{
    ready()
    {
        console.log('Welcome Home, Triggered on this pages load.');
        Home.log();
    }
}
