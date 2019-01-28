import { Controller } from 'cx/ui';
import { GET } from '../../../api/methods';

export default class extends Controller {
    async init() {
        var projectNames = await getProjects("project/getNames");
        this.store.set('selectedProjectName', projectNames[0].text);
        this.store.set('projects', projectNames);

        var projectTypes = await getData("type");
        this.store.set('selectedTypeName', projectTypes[0].text);
        this.store.set('types', projectTypes);

        var projectPriorities = await getData("priority");
        this.store.set('selectedPriorityName', projectPriorities[0].text);
        this.store.set('priorities', projectPriorities);

        var projectStates = await getData("state");
        this.store.set('selectedStateName', projectStates[0].text);
        this.store.set('states', projectStates);
    }
    onUploadStarting(xhr, instance, file) {
        console.log(file)
        if (file.size > 1e6) {
            toast("The file is too large.");
            return false;
        }

    }
    deleteAttachment() {
        console.log("aa");
    }
    onUploadComplete(xhr, instance, file, formData) {
        this.file = file;
        // var attachment = this.store.get("issue.attachments");
        // if (attachment == null) {
        //     attachment = [];
        // }
        let newAttachment = {

            text: file.name
        };

        this.store.update("issue.attachments", (existingAttachments = []) => {
            return [
                ...existingAttachments,
                newAttachment
            ];
        });

        console.log(this.store.get("issue.attachments"))
    }
    onUploadError(e) {
        console.log(e);
    }
};

async function getData(path) {
    var result = await GET(path);
    var projectNames = [];
    if (result != null) {
        result.forEach(element => {
            projectNames.push({
                id: element.index,
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
