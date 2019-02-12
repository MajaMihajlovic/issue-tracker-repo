import { Controller } from "cx/ui";
import { GET, PUT, POST, DELETE } from "../../../api/methods";
import { showErrorToast, toast } from "../../../components/toasts";

export default class extends Controller {
    onInit() {
        // this.loadProject(this.store);
        this.store.set("$page.mode", "view");
        this.loadData();
        this.loadAttachments();
    }

    async loadAttachments() {
        let id = this.store.get("$route.id");
        var result = await GET("attachment/getById/" + id);
        var newResult = [];
        result.forEach(element => {
            newResult.push({
                name: element.name,
                file: element.file
            });
        });
        this.store.set("issue.attachments", newResult);
    }

    async loadData() {
        let id = this.store.get("$route.id");
        let issue = await GET("issue/getById/" + id);
        this.store.set("$page.selectedPriorityName", issue.issueCustom.priority)
        this.store.set("$page.selectedTypeName", issue.issueCustom.type)
        this.store.set("$page.selectedStateName", issue.issueCustom.state)
        this.store.set("$page.selectedVersionName", issue.issueCustom.version)
        this.store.set("$page.selectedPriorityName", issue.issueCustom.priority)
        this.store.set("$page.selectedAssigneeName", issue.issueCustom.assigneeFullName)
        this.store.set("$page.issue.duedate", issue.issueCustom.duedate)
        this.store.set("$page.selectedProjectName", issue.issueCustom.projectName)
        this.store.set("$page.issue.title", issue.issueCustom.title)
        this.store.set("$page.issue.description", issue.issueCustom.description)
    }

    cancel(e) {
        e.preventDefault();
        this.store.set('$page.mode', 'view');
    }

}
