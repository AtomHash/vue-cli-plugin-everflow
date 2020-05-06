import { Page, decorators } from 'everflow';

@decorators.Component({})
export default class AboutPage extends Page
{
    ready()
    {
        console.log('About Page');
        this.$store.commit('home/increment');
        console.log(this.$store.state.home.count);
    }
}
