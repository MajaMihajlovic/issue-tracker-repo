import { Controller } from "cx/ui";
import { GET, POST } from "../../api/methods";
import { showErrorToast, toast } from "../toasts";

export default (resolve, id) => class extends Controller {

    async initWindow() {
        var projectNames = await getData("project");
        this.store.set('projects', projectNames);
        var projectTypes = await getData("type");
        this.store.set('types', projectTypes)
        var projectVersions = await getData("version");
        this.store.set('versions', projectVersions);
        var projectPriorities = await getData("priority");
        this.store.set('priorities', projectPriorities);
        var projectStates = await getData("state");
        this.store.set('states', projectStates);
        this.store.set('selectedProjectName', projectNames[0].text);
        this.store.set('selectedProjectId', projectNames[0].id);
        this.store.set('selectedTypeName', projectTypes[0].text);
        this.store.set('selectedTypeId', projectTypes[0].id);
        this.store.set('selectedVersionName', projectVersions[0].text);
        this.store.set('selectedVersionId', projectVersions[0].id);
        this.store.set('selectedPriorityName', projectPriorities[0].text);
        this.store.set('selectedPriorityId', projectPriorities[0].id);
        this.store.set('selectedStateName', projectStates[0].text);
        this.store.set('selectedStateId', projectStates[0].id);
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

    onUploadComplete(xhr, instance, filee) {
        let store = this.store;
        this.filee = filee;
        let newAttachment = {
            text: filee.name
        };
        store.update("issue.attachments", (existingAttachments = []) => {
            return [
                ...existingAttachments,
                newAttachment
            ];
        });
        var reader = new FileReader();
        reader.onload = function (event) {
            var newDocument = {
                name: filee.name,
                file: event.target.result.split("base64,")[1]
            }
            store.update("issue.attachmentsForDb", (existingAttachments = []) => {
                return [
                    ...existingAttachments,
                    newDocument
                ];
            });
        }
        reader.readAsDataURL(filee);
        console.log(this.store.get("issue.attachmentsForDb"))
    }
    onUploadError(e) {
        console.log(e);
    }

    async save() {
        var user;
        if ((user = sessionStorage.getItem('user')) == undefined) {
            user = localStorage.getItem('user')
        }
        var newIssue = {
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
            newIssue.projectId = this.store.
                get('projectId');
        } else {
            newIssue.projectId = this.store.
                get('selectedProjectId')
        }
        let files = this.store.get("issue.attachmentsForDb")
        try {
            let issueAttachmnt = {
                issue: newIssue,
                list: files
            }
            let response = await POST("issue/insert", issueAttachmnt);
            if (response != 'Success') {
                showErrorToast(response);
            } else {
                toast("Issue submitted succesfully. Assignee will receive an email notification.");
                resolve(true);
                this.instance.dismiss();
                this.store.delete('issue')
                this.store.delete('selectedAssigneeId');
                this.store.delete('selectedAssigneeName');
                this.store.delete("issue.attachmentsForDb");
                this.store.delete("issue.attachments")
            }
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