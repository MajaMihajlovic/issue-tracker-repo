import { Controller, Url, History } from 'cx/ui';




export default class extends Controller {
    init() {
        console.log("init");
        super.init();
        this.store.delete('user');
        sessionStorage.removeItem('user');
        History.pushState({}, null, Url.resolve('~/'));
    }
}
