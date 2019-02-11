import { LabelsLeftLayout, Repeater, Text } from 'cx/ui';
import { Button, DateField, FlexCol, FlexRow, Link, LookupField, MsgBox, Section, TextArea, TextField, UploadButton, ValidationGroup } from 'cx/widgets';
import Controller from './Controller';

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
                            <TextField
                                value-bind="$page.issue.title"
                                label="Summary"
                                style="width: 100%;"
                                mode-bind="$page.mode"
                            />
                            <TextArea
                                value-bind="$page.issue.description"
                                label="Description"
                                style="width: 100%; max-width: 950px; padding-bottom:50px"
                                rows={10}
                                mode-bind="$page.mode"
                            />
                            <br /></div>
                        <FlexRow>
                            <Text value="Attachment" visible-expr="!{issue.attachments}" style="width: 100%"></Text>
                            <Repeater
                                records-bind='issue.attachments'
                                recordAlias="$file"
                                label="Attachments">
                                <FlexCol>
                                    <a style="text-decoration:none" download-tpl={"{$file.name}"} href-tpl={"data:application/octet-stream;base64, {$file.file}"}>
                                        <div class="attachment" text-bind="$file.name" />
                                    </a>
                                    <div class="button" onClick="delete"></div></FlexCol>
                            </Repeater></FlexRow>
                        <br />
                    </FlexCol>
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