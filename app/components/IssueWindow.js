import { Widget, LabelsLeftLayout, Repeater, Controller } from 'cx/ui';
import {
    Button,
    TextField,
    ValidationGroup,
    FlexRow,
    FlexCol, Link, LookupField, TextArea, Window, Section,
    DateField, UploadButton, MsgBox
} from 'cx/widgets';

import { Glyph } from 'app/components/Glyph';
import { GET, POST } from '../api/methods';
import { store } from '../store';
import { showErrorToast, toast } from './toasts';
import "./issueWindow.scss"
import MyController from './MyController';
const IssueWindow = <cx>

    <Window modal center >
        <main >
            <div putInto="header">
                <ul class="csb-breadcrumb">
                    <li class="cse-breadcrumb-item">
                        Odgovarajuci naslov
                    </li>
                </ul>
            </div>
            <div controller={MyController}>
                <ValidationGroup layout={LabelsLeftLayout} invalid-bind="issue.invalid">
                    <FlexRow style="padding:30px">
                        <FlexCol style="width:600px; padding-right:30px">
                            <LookupField //visible-expr="!{projectSelected}"
                                label="Project"
                                value-bind="selectedProjectId"
                                text-bind="selectedProjectName"
                                options-bind="projects"
                            />
                            <TextField
                                value-bind="issue.title"
                                label="Summary"
                                style="width: 100%; max-width: 950px"
                                asterisk
                                required
                            />
                            <TextArea
                                value-bind="issue.description"
                                label="Description"
                                style="width: 100%; max-width: 950px"
                                rows={10}
                                required
                                asterisk
                            />

                            <br />
                            <div layout={LabelsLeftLayout} >
                                <UploadButton
                                    value-bind="issue.attachments"
                                    url="#"
                                    onUploadStarting={onUploadStarting}
                                    onUploadComplete={onUploadComplete}
                                    onUploadError={onUploadError}
                                    mode-bind="mode"
                                    label="Attachments"
                                    style="width:33px; border-radius:25%">
                                    <Glyph name-expr="{$topic.glyph} || 'plus'" />
                                </UploadButton>
                            </div>
                            <Repeater
                                records-bind='issue.attachments'
                                recordAlias="$file"
                            >
                                <FlexRow>
                                    <div class="attachment" text-bind="$file.text" /><div class="button" onClick={(e, { store }) => {
                                        MsgBox.yesNo("Are you sure you want to delete this attachment").then((btn) => {
                                            if (btn == 'yes') {
                                                var record = store.get("$file");
                                                console.log(store.get("issue.attachments"));
                                                store.update('issue.attachments', records => records.filter(r => r != record))
                                            }
                                        });
                                    }}

                                    ></div></FlexRow>
                            </Repeater>

                            <br />
                            <FlexRow spacing>

                                <Button
                                    mod="primary"
                                    onClick={save}
                                    text="Add"
                                    disabled-bind="issue.invalid"
                                    mod="primary"
                                />

                            </FlexRow></FlexCol>

                        <div class="project" style="width:385px"><Section>
                            <h3 style="margin:10px 10px">Project <span text-bind="selectedProjectName" /></h3>
                            <FlexCol>
                                <div layout={LabelsLeftLayout}>
                                    <LookupField
                                        label="Priority"
                                        value-bind="selectedPriorityId"
                                        text-bind="selectedPriorityName"
                                        options-bind="priorities"
                                        multiple={false}
                                    />
                                    <LookupField
                                        label="Type"
                                        value-bind="selectedTypeId"
                                        text-bind="selectedTypeName"
                                        options-bind="types"
                                        multiple={false}
                                    /> <LookupField
                                        label="State"
                                        value-bind="selectedStateId"
                                        text-bind="selectedStateName"
                                        options-bind="states"
                                        multiple={false}
                                    />
                                    <LookupField
                                        label="Assignee"
                                        value-bind="selectedAssigneeId"
                                        text-bind="selectedAssigneeName"
                                        options-bind="assignees"
                                        multiple={false}
                                    />
                                    <LookupField
                                        label="Subsystem"
                                        value-bind="selectedVersionId"
                                        text-bind="selectedVersionName"
                                        options-bind="versions"
                                        value="selectedVersionName"
                                    />
                                    <DateField label="Due date"
                                        minValue={new Date()}
                                        value-bind="issue.duedate"
                                        required />
                                </div>
                                <br />
                            </FlexCol>
                        </Section></div>
                    </FlexRow>
                </ValidationGroup></div>
        </main>
    </Window>
</cx >;




export async function openIssueWindow(store) {
    let win = Widget.create(IssueWindow);
    var projectNames = await getData("project");
    store.set('selectedProjectName', projectNames[0].text);
    store.set('selectedProjectId', projectNames[0].id);
    store.set('projects', projectNames);

    var projectTypes = await getData("type");
    store.set('selectedTypeName', projectTypes[0].text);
    store.set('selectedTypeId', projectTypes[0].id);
    store.set('types', projectTypes);

    var projectVersions = await getData("version");
    store.set('selectedVersionName', projectVersions[0].text);
    store.set('selectedVersionId', projectVersions[0].id);
    store.set('versions', projectVersions);

    var projectPriorities = await getData("priority");
    store.set('selectedPriorityName', projectPriorities[0].text);
    store.set('selectedPriorityId', projectPriorities[0].id);
    store.set('priorities', projectPriorities);

    var projectStates = await getData("state");
    store.set('selectedStateName', projectStates[0].text);
    store.set('selectedStateId', projectStates[0].id);
    store.set('states', projectStates);


    /*addTrigger("selectedProjectId", ["selectedProjectId"], async selectedProjectId => {
         var result = await GET("user/getParticipants/" + selectedProjectId);
         var newResult = [];
         result.forEach(element => {
             newResult.push({
                 id: element.id,
                 text: element.fullName
             });
         })
         store.set('assignees', newResult);
     });*/
    win.open(store);
}
function onUploadStarting(xhr, instance, file) {

    if (file.size > 1e6) {
        toast("The file is too large.");
        return false;
    }
}

function onUploadComplete(xhr, instance, file) {
    this.file = file;
    let newAttachment = {
        text: file.name
    };
    store.update("issue.attachments", (existingAttachments = []) => {
        return [
            ...existingAttachments,
            newAttachment
        ];
    });
}

function onUploadError(e) {
    console.log(e);
}

async function save() {
    var user;
    if ((user = sessionStorage.getItem('user')) == undefined) {
        user = localStorage.getItem('user')
    }
    var issue = {
        title: store.get('issue.title'),
        description: store.get('issue.description'),
        stateId: store.get('selectedStateId'),
        priorityId: store.get('selectedPriorityId'),
        duedate: store.get('issue.duedate'),
        createdDate: new Date(),
        typeId: store.get('selectedTypeId'),
        reporterId: JSON.parse(user).id,
        assigneeId: store.get('selectedAssigneeId'),
        versionId: store.get('selectedVersionId'),
    }

    if (store.get("selectedProject")) {
        issue.projectId = store.get('projectId');
    } else {
        issue.projectId = store.get('selectedProjectId')
    }
    try {
        await POST("issue/insert", issue);
        toast("Issue submitted succesfully. Assignee will receive an email notification.");
        store.delete('issue')
        store.delete('selectedAssigneeId');
        store.delete('selectedAssigneeName');

    } catch (e) {
        showErrorToast(e);
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
