import { Controller } from 'cx/ui';
import { GET, POST } from '../../../api/methods';
import { showErrorToast, toast } from '../../../components/toasts';

export default class extends Controller {
    async init() {
        var projectNames = await getData("project");
        this.store.set('selectedProjectName', projectNames[0].text);
        this.store.set('selectedProjectId', projectNames[0].id);
        this.store.set('projects', projectNames);

        var projectTypes = await getData("type");
        this.store.set('selectedTypeName', projectTypes[0].text);
        this.store.set('selectedTypeId', projectTypes[0].id);
        this.store.set('types', projectTypes);

        var projectPriorities = await getData("priority");
        this.store.set('selectedPriorityName', projectPriorities[0].text);
        this.store.set('selectedPriorityId', projectPriorities[0].id);
        this.store.set('priorities', projectPriorities);

        var projectStates = await getData("state");
        this.store.set('selectedStateName', projectStates[0].text);
        this.store.set('selectedStateId', projectStates[0].id);
        this.store.set('states', projectStates);
    }
    onUploadStarting(xhr, instance, file) {
        console.log(file)
        if (file.size > 1e6) {
            toast("The file is too large.");
            return false;
        }

    }

    onUploadComplete(xhr, instance, file, formData) {
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

    async  save() {
        var issue = {
            title: this.store.get('issue.title'),
            description: this.store.get('issue.description'),
            stateId: this.store.get('selectedStateId'),
            priorityId: this.store.get('selectedPriorityId'),
            duedate: this.store.get('issue.duedate'),
            createdDate: new Date(),
            typeId: this.store.get('selectedTypeId'),
            reporterId: this.store.get('user.id'),
            assigneeId: 1,
            versionId: 1,
            projectId: this.store.get('selectedProjectId')
        }
        console.log(issue);
        try {
            await POST("issue/insert", issue);
            toast("Issue submitted succesfully. Assignee will receive an email notification.");
            this.store.delete('issue')
        } catch (e) {
            showErrorToast(e);
        }
    }
};

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
async function getProjects(path) {
    var result = await GET(path);
    var projectNames = [];
    if (result != null) {
        result.forEach(element => {
            projectNames.push({
                id: element,
                text: element
            });
        })
    }
    return projectNames;
}

