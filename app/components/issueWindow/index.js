import { Widget, LabelsLeftLayout, Repeater, Text } from 'cx/ui';
import {
    Button,
    TextField,
    ValidationGroup,
    FlexRow,
    FlexCol, Link, LookupField, TextArea, Window, Section,
    DateField, UploadButton, MsgBox, initiateDragDrop
} from 'cx/widgets';

import { Glyph } from 'app/components/Glyph';
import "./index.scss"
import getController from "./Controller";

export async function openIssueWindow(store, id) {
    return new Promise(async (resolve) => {
        let window = <cx><Window
            title="Add Issue"
            modal
            center

            bodyStyle="display: flex; flex-direction: column; padding: 20px"
            controller={getController(resolve, id)}
        >
            <div >
                <ValidationGroup layout={LabelsLeftLayout} invalid-bind="issue.invalid">
                    <FlexRow style="padding:30px">
                        <FlexCol style="width:500px; padding-right:30px">
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
                                    onUploadStarting="onUploadStarting"
                                    onUploadComplete="onUploadComplete"
                                    onUploadError="onUploadError"
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
                            <FlexRow spacing justify="end" putInto="footer">
                                <Button
                                    text="Cancel"
                                    dismiss
                                />
                                <Button
                                    mod="primary"
                                    onClick='save'
                                    text="Save"
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
                                        required
                                        asterisk
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
                </ValidationGroup>
            </div>
        </Window></cx>;

        let win = Widget.create(window);
        win.open(store);
    });
}





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
