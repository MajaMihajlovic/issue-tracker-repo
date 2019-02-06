import { Controller } from "cx/ui";
import { GET, POST } from "../../api/methods";
import { showErrorToast, toast } from "../toasts";

export default class extends Controller {

    async initWindow() {
        var projectNames = await getData("project");
        this.store.set('selectedProjectName', projectNames[0].text);
        this.store.set('selectedProjectId', projectNames[0].id);
        this.store.set('projects', projectNames);

        var projectTypes = await getData("type");
        this.store.set('selectedTypeName', projectTypes[0].text);
        this.store.set('selectedTypeId', projectTypes[0].id);
        this.store.set('types', projectTypes);

        var projectVersions = await getData("version");
        this.store.set('selectedVersionName', projectVersions[0].text);
        this.store.set('selectedVersionId', projectVersions[0].id);
        this.store.set('versions', projectVersions);

        var projectPriorities = await getData("priority");
        this.store.set('selectedPriorityName', projectPriorities[0].text);
        this.store.set('selectedPriorityId', projectPriorities[0].id);
        this.store.set('priorities', projectPriorities);

        var projectStates = await getData("state");
        this.store.set('selectedStateName', projectStates[0].text);
        this.store.set('selectedStateId', projectStates[0].id);
        this.store.set('states', projectStates);
    }

    onInit() {
        this.initWindow();
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

            if (newResult.length > 0) {
                this.store.set('selectedAssigneeName', newResult[0].text);
                this.store.set('selectedAssigneeId', newResult[0].id);
            }
            this.store.set('assignees', newResult);
        } catch (e) {
            this.store.delete('assignees');
            this.store.delete('selectedAssigneeName');
            this.store.delete("selectedAssigneeId")
        }
    }

    onUploadStarting(xhr, instance, file) {

        if (file.size > 1e6) {
            toast("The file is too large.");
            return false;
        }
    }

    onUploadComplete(xhr, instance, file) {
        this.file = file;
        let newAttachment = {
            text: file.name
        };
        this.store.update("issue.attachments", (existingAttachments = []) => {
            return [
                ...existingAttachments,
                newAttachment
            ];
        });
    }
    onUploadError(e) {
        console.log(e);
    }

    async save() {
        var user;
        if ((user = sessionStorage.getItem('user')) == undefined) {
            user = localStorage.getItem('user')
        }
        var issue = {
            title: this.store.
                get('issue.title'),
            description: this.store.
                get('issue.description'),
            stateId: this.store.
                get('selectedStateId'),
            priorityId: this.store.
                get('selectedPriorityId'),
            duedate: this.store.
                get('issue.duedate'),
            createdDate: new Date(),
            typeId: this.store.
                get('selectedTypeId'),
            reporterId: JSON.parse(user).id,
            assigneeId: this.store.
                get('selectedAssigneeId'),
            versionId: this.store.
                get('selectedVersionId'),
        }

        if (this.store.get("selectedProject")) {
            issue.projectId = this.store.
                get('projectId');
        } else {
            issue.projectId = this.store.
                get('selectedProjectId')
        }
        try {
            await POST("issue/insert", issue);
            toast("Issue submitted succesfully. Assignee will receive an email notification.");
            this.store.
                delete('issue')
            this.store.
                delete('selectedAssigneeId');
            this.store.
                delete('selectedAssigneeName');

        } catch (e) {
            showErrorToast(e);
        }
    }
}
async function getData(path) {
    var result = await GET(path);
    var projectNames = [];
    if (result != null) {
        result.forEach(element => {
            projectNames.push({
                id: element.id,
                text: element.name
            });
        })
    }
    return projectNames;
}