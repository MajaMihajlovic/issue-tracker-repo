import { Controller } from "cx/ui";
import { GET } from "../../api/methods";

export default class extends Controller {
    async onInit() {
        super.init();
        console.log("maaaa")
        console.log(this.store.getData());
        this.addTrigger("reportSelectedProjectId", ["report.selectedProjectId"], async selectedProjectId => {
            console.log(this.store.get('report.selectedProjectId'))
            var result = await GET("issue/byType/" + selectedProjectId);
            this.store.set('chartData', result);
        });

    }
}