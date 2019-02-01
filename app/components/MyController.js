import { Controller } from "cx/ui";
import { GET } from "../api/methods";

export default class MyController extends Controller {
    onInit() {
        this.addTrigger("selectedProjectId", ["selectedProjectId"], async selectedProjectId => {
            var result = await GET("user/getParticipants/" + selectedProjectId);
            var newResult = [];
            result.forEach(element => {
                newResult.push({
                    id: element.id,
                    text: element.fullName
                });
            })
            this.store.set('assignees', newResult);
        });
    }
}