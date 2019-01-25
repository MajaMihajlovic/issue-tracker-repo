import { Controller } from 'cx/ui';
import { GET } from '../../../api/methods';

export default class extends Controller {
    async init() {
        var result = await GET("project/getNames");
        var projectNames = [];
        if (result != null) {
            result.forEach(element => {

                projectNames.push({
                    id: element,
                    text: element
                });
            })
        }

        this.store.set('selectedProjectName', projectNames[0].text);
        console.log(projectNames[0].text);
        this.store.set('projects', projectNames);
    }
};
