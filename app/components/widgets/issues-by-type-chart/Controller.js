import { Controller } from "cx/ui";
import { GET } from "../../../api/methods";
export default class extends Controller {
    onInit() {
        console.log(this.store.get("selectedProjectId"));
        this.addTrigger("reportSelectedProjectId", ["selectedProjectId"], () => this.getChartData());

    }

    async getChartData() {
        let id = this.store.get("selectedProjectId");
        var result = await GET("issue/byType/" + id);
        this.store.set('chartData', result);
    }
}