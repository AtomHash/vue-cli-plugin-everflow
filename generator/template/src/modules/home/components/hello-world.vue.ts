import { decorators } from 'everflow';
import Vue from 'vue';

@decorators.Component({})
export default class HelloWorld extends Vue
{
    @decorators.Prop() private msg!: string;
}
