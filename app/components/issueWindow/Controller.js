import { Controller } from "cx/ui";
import { GET, POST, PUT } from "../../api/methods";
import { showErrorToast, toast } from "../toasts";
import { MsgBox } from "cx/widgets";

export default (resolve, id) => class extends Controller {

    onInit() {
        if (id) {
            this.loadAttachments();
        }
        this.loadData(id);
        this.addTrigger("selectedProjectId", ["selectedProjectId"], () => {
            this.loadParticipants();
        });
    }

    delete() {
        MsgBox.yesNo("Are you sure you want to delete this attachment").then((btn) => {
            if (btn == 'yes') {
                var record = this.store.get("$file");
                this.store.update('issue.attachmentsForDb', records => records.filter(r => r != record))
            }
        });
    }


    async loadAttachments() {
        var result = await GET("attachment/getById/" + id);
        var newResult = [];
        result.forEach(element => {
            newResult.push({
                name: element.name,
                file: element.file
            });
        });
        this.store.set("issue.attachmentsForDb", newResult);
    }

    async loadData() {
        var projectNames = await GET("project");
        this.store.set('projects', projectNames);
        var projectTypes = await GET("type");
        this.store.set('types', projectTypes)
        var projectVersions = await GET("version");
        this.store.set('versions', projectVersions);
        var projectPriorities = await GET("priority");
        this.store.set('priorities', projectPriorities);
        var projectStates = await GET("state");
        this.store.set('states', projectStates);
        if (id) {
            let issue = await GET("issue/getIssueById/" + id);
            this.store.set('issueId', issue.id);
            this.store.set('selectedProjectId', issue.projectId);
            this.store.set('selectedTypeId', issue.typeId);
            this.store.set('selectedVersionId', issue.versionId);
            this.store.set('selectedPriorityId', issue.priorityId);
            this.store.set('selectedStateId', issue.stateId);
            this.store.set('selectedAssigneeId', issue.assigneeId);
            this.store.set('issue.title', issue.title);
            this.store.set('issue.description', issue.description);
            this.store.set('issue.duedate', issue.duedate);

        } else {
            this.store.set('selectedProjectId', projectNames[0].id);
            this.store.set('selectedTypeId', projectTypes[0].id);
            this.store.set('selectedVersionId', projectVersions[0].id);
            this.store.set('selectedPriorityId', projectPriorities[0].id);
            this.store.set('selectedStateId', projectStates[0].id);
        }
        this.loadParticipants();
    }

    async loadParticipants() {
        try {
            var participants = await GET("user/getParticipants/" + this.store.get("selectedProjectId"));
            this.store.set('assignees', participants);
        } catch (e) {
            this.store.delete('assignees');
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

        var reader = new FileReader();
        reader.onload = function (event) {
            var newDocument = {
                name: filee.name,
                file: event.target.result.split("base64,")[1]
            }
            let newAttachment = { text: filee.name, file: event.target.result.split("base64,")[1] };
            store.update("issue.attachments", (existingAttachments = []) => {
                return [
                    ...existingAttachments,
                    newAttachment
                ];
            });
            store.update("issue.attachmentsForDb", (existingAttachments = []) => {
                return [
                    ...existingAttachments,
                    newDocument
                ];
            });
        }
        reader.readAsDataURL(filee);
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
            title: this.store.get('issue.title'),
            description: this.store.get('issue.description'),
            stateId: this.store.get('selectedStateId'),
            priorityId: this.store.get('selectedPriorityId'),
            duedate: this.store.get('issue.duedate'),
            createdDate: new Date(),
            typeId: this.store.get('selectedTypeId'),
            reporterId: JSON.parse(user).id,
            assigneeId: this.store.get('selectedAssigneeId'),
            versionId: this.store.get('selectedVersionId'),
        }

        if (this.store.get("selectedProject"))
            newIssue.projectId = this.store.get('projectId');
        else newIssue.projectId = this.store.get('selectedProjectId')

        let files = this.store.get("issue.attachmentsForDb")
        let issueAttachmnt = { issue: newIssue, list: files }
        if (files) {
            if (!id) {
                var response = await POST("issue/insertWithAttachment", issueAttachmnt);
            }
            else {
                issueAttachmnt.issue.id = this.store.get("issueId")
                response = await PUT("issue/insertWithAttachment", issueAttachmnt);
            }
        }
        else {
            if (!id) {
                var response = await POST("issue/insert", newIssue);
            }
            else {
                newIssue.id = this.store.get("issueId")
                response = await PUT("issue/insert", newIssue);
            }
        }

        try {
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
