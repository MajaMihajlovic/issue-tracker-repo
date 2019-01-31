import { Controller, Url, History } from 'cx/ui';
import { GET, DELETE } from '../../api/methods';
import { showErrorToast } from '../../components/toasts';

export default class extends Controller {
    async init() {
        this.store.init('list.loading', true);
        var result = await GET("project/");
        this.store.set('list.data', result);
        this.store.set('list.loading', false);
        this.addTrigger('load', ['search.query', 'list.version'], :: this.load, true);
    }

    async finish() {
        var result = await GET("project/finish/" + this.store.get('$project.id'), null, 'text');
        var result = await GET("project/");
        this.store.set('list.data', result);
    }

    async delete() {
        try {
            var result = await DELETE("project/" + this.store.get('$project.id'), null);
            var result = await GET("project/");
            this.store.set('list.data', result);
        } catch (e) {
            showErrorToast(e);
        }
    }

    edit(e) {
        e.preventDefault();
        var returnUrl = this.store.get("$route.returnUrl");
        History.pushState({}, null, Url.resolve("~/projects/create"));
        this.store.set('new_project', this.store.get('$project'));
    }

    async load() {
        console.log(this.store.get('search.query'))
        var q = this.store.get('search.query');
        if (q != null) {
            var result = await GET("project/getByName/" + q);
        } else {
            var result = await GET("project");
        }
        this.store.set('list.data', result);

    }
};
