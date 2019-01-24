import { Controller } from 'cx/ui';
import { GET } from '../../../api/methods';
export default class extends Controller {
   async init() {
        this.store.init('list.loading', true);
        this.addTrigger('load', ['search.query', 'list.version'], ::this.load, true);
        var result=await GET("project/");
            console.log(result)
            console.log(result)
            this.store.set('list.data', result);
            this.store.set('list.loading', false);
    }

    async load() {
        var q = this.store.get('search.query');
        var options = {
            q: q || ''
        };
        
     
        };
}