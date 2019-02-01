import { Controller } from "cx/ui";
import { GET } from "../api/methods";

export default class MyController extends Controller {
    onInit() {
        this.addTrigger("selectedProjectId", ["selectedProjectId"], () => {
            this.loadData();
        });
    }

    async loadData() {
        try {
            var result = await GET("user/getParticipants/" + this.store.get("selectedProjectId"));
            var newResult = [];
            result.forEach(element => {
                newResult.push({
                    id: element.id,
                    text: element.fullName
                });
            });
            this.store.set('assignees', newResult);
        } catch (e) {
            this.store.remove('assignees')
        }
    }
}