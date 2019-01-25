import { Controller } from 'cx/ui';
import { GET } from '../../../api/methods';

export default class extends Controller {
    async init() {
        this.store.init('list.loading', true);
        var result = await GET("project/");
        this.store.set('list.data', result);
        this.store.set('list.loading', false);
    }
};
