import { LabelsLeftLayout, Repeater, Widget } from 'cx/ui';
import { Button, DateField, FlexCol, FlexRow, LookupField, MsgBox, Section, TextArea, TextField, UploadButton, ValidationGroup, Window } from 'cx/widgets';
import getController from "./Controller";

export async function openIssueWindow(id) {
    return new Promise(async (resolve) => {
        let window = <cx><Window
            title={id ? "Edit Issue" : "Add Issue"}
            modal
            center
            bodyStyle="display: flex; flex-direction: column;"
            controller={getController(resolve, id)}
        >
            <div >
                <ValidationGroup layout={LabelsLeftLayout} invalid-bind="issue.invalid">
                    <FlexRow style="padding:20px">
                        <FlexCol style="width:500px; padding-right:30px">
                            <LookupField //visible-expr="!{projectSelected}"
                                label="Project"
                                value-bind="selectedProjectId"
                                options-bind="projects"
                                optionTextField="name"
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
                                    style="border-radius:30%; padding:5px; width:24px; font-size:15px">
                                    <i class="fa fa-plus" />
                                </UploadButton>
                            </div>
                            <Repeater
                                records-bind='issue.attachments'
                                recordAlias="$file"
                            >
                                <FlexRow>
                                    <body>
                                        <a href-tpl={"data:image/jpg;base64, {$file.file}"}>test</a>
                                    </body>

                                    <div class="attachment" text-bind="$file.text" />
                                    <div class="button" onClick={(e, { store }) => {
                                        MsgBox.yesNo("Are you sure you want to delete this attachment").then((btn) => {
                                            if (btn == 'yes') {
                                                var record = store.get("$file");
                                                store.update('issue.attachments', records => records.filter(r => r != record))
                                                store.update('issue.attachmentsForDb', records => records.filter(r => r != record))
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
                                        options-bind="priorities"
                                        optionTextField="name"
                                    />
                                    <LookupField
                                        label="Type"
                                        value-bind="selectedTypeId"
                                        options-bind="types"
                                        optionTextField="name"
                                    />
                                    <LookupField
                                        label="State"
                                        value-bind="selectedStateId"
                                        options-bind="states"
                                        optionTextField="name"
                                    />
                                    <LookupField
                                        label="Assignee"
                                        value-bind="selectedAssigneeId"
                                        options-bind="assignees"
                                        required
                                        asterisk
                                        optionTextField="fullName"
                                    />
                                    <LookupField
                                        label="Subsystem"
                                        value-bind="selectedVersionId"
                                        options-bind="versions"
                                        optionTextField="name"
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
        win.open();
    });
}
