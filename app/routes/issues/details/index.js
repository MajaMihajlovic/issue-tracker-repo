import Controller from './Controller';
import { Widget, LabelsLeftLayout, Repeater, Text, LabelsTopLayout } from 'cx/ui';
import {
    Button,
    TextField,
    ValidationGroup,
    FlexRow,
    FlexCol, Link, LookupField, TextArea, Window, Section,
    DateField, UploadButton, MsgBox, initiateDragDrop
} from 'cx/widgets';

export default <cx>
    <main controller={Controller} >
        <div putInto="header">
            <ul class="csb-breadcrumb">
                <li class="cse-breadcrumb-item">
                    <Link href="~/issues/{id}">Issues</Link>
                </li>
            </ul>
        </div>
        <div >
            <ValidationGroup layout={LabelsLeftLayout} invalid-bind="issue.invalid">
                <FlexRow style="padding:30px">
                    <FlexCol style="width:600px; padding-right:30px">
                        <div layout={LabelsLeftLayout}>
                            <LookupField //visible-expr="!{projectSelected}"
                                label="Project"
                                value-bind="$page.selectedProjectId"
                                text-bind="$page.selectedProjectName"
                                options-bind="$page.projects"
                                mode-bind="$page.mode"
                            />
                            <TextField
                                value-bind="$page.issue.title"
                                label="Summary"
                                style="width: 100%; max-width: 950px"
                                required
                                mode-bind="$page.mode"
                            />
                            <TextArea
                                value-bind="$page.issue.description"
                                label="Description"
                                style="width: 100%; max-width: 950px"
                                rows={10}
                                required
                                mode-bind="$page.mode"
                            />
                            <br />
                            <div layout={LabelsLeftLayout}  >
                                <UploadButton
                                    mode-bind="$page.mode"
                                    value-bind="$page.issue.attachments"
                                    url="#"
                                    onUploadStarting="onUploadStarting"
                                    onUploadComplete="onUploadComplete"
                                    onUploadError="onUploadError"
                                    label="Attachments"
                                    style="width:33px; border-radius:25%">
                                    <i class="fas fa-plus"></i>
                                </UploadButton>
                            </div>
                            <Repeater
                                records-bind='issue.attachments'
                                recordAlias="$file"
                            >
                                <FlexRow>
                                    <div class="attachment" text-bind="$file.text" /><div mode-bind="$page.mode" class="button" onClick={(e, { store }) => {
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
                                    onClicl="cancel"
                                />
                                <Button
                                    mod="primary"
                                    onClick='edit'
                                    text="Edit"
                                    disabled-bind="issue.invalid"
                                    mod="primary"
                                />

                            </FlexRow>
                        </div></FlexCol>
                    <div class="project" style="width:385px"><Section>
                        <h3 style="margin:10px 10px">Project <span text-bind="$page.selectedProjectName" /></h3>
                        <FlexCol>
                            <div layout={LabelsLeftLayout}>
                                <LookupField
                                    label="Priority"
                                    mode-bind="$page.mode"
                                    value-bind="$page.selectedPriorityId"
                                    text-bind="$page.selectedPriorityName"
                                    options-bind="$page.priorities"
                                />
                                <LookupField
                                    label="Type"
                                    value-bind="$page.selectedTypeId"
                                    text-bind="$page.selectedTypeName"
                                    options-bind="$page.types"
                                    mode-bind="$page.mode"
                                /><LookupField
                                    label="State"
                                    value-bind="$page.selectedStateId"
                                    text-bind="$page.selectedStateName"
                                    options-bind="$page.states"
                                    mode-bind="$page.mode"
                                />
                                <LookupField
                                    label="Assignee"
                                    value-bind="$page.selectedAssigneeId"
                                    text-bind="$page.selectedAssigneeName"
                                    options-bind="$page.assignees"
                                    multiple={false}
                                    required
                                    mode-bind="$page.mode"
                                />
                                <LookupField
                                    label="Subsystem"
                                    value-bind="$page.selectedVersionId"
                                    text-bind="$page.selectedVersionName"
                                    options-bind="$page.versions"
                                    value="$page.selectedVersionName"
                                    mode-bind="$page.mode"
                                />
                                <DateField label="Due date"
                                    minValue={new Date()}
                                    value-bind="$page.issue.duedate"
                                    mode-bind="$page.mode"
                                    required />
                            </div>
                            <br />
                        </FlexCol>
                    </Section></div>

                </FlexRow>
            </ValidationGroup>
        </div>

    </main>
</cx >