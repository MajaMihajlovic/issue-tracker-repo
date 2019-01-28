import {
    Button, TextArea,
    TextField,
    ValidationGroup, LookupField, Section,
    FlexRow,
    FlexCol, Link, DateField, UploadButton, Repeater, MsgBox
} from 'cx/widgets';
import { LabelsLeftLayout, PropertySelection, Text } from 'cx/ui';
import { Glyph } from 'app/components/Glyph';
import Controller from './Controller';
import "./index.scss"
export default <cx>
    <main controller={Controller} >

        <div putInto="header">
            <ul class="csb-breadcrumb">
                <li class="cse-breadcrumb-item">
                    <Link href="~/issues/create">Issues</Link>
                </li>
            </ul>
        </div>
        <FlexRow style="padding:30px">
            <FlexCol style="width:600px; padding-right:30px">
                <LookupField
                    label="Project"
                    value-bind="selectedProjectId"
                    text-bind="selectedProjectName"
                    options-bind="projects"
                    value="selectedProjectName"
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
                />

                <br />
                <div layout={LabelsLeftLayout} style="margin-left:10px">
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
                <FlexRow spacing>
                    <Button
                        onClick="back"
                        text="Back"
                    />
                    <Button
                        mod="primary"
                        onClick="save"
                        text="Add"
                        disabled-bind="issue.invalid"
                        mod="primary"
                    />

                </FlexRow></FlexCol>
            <ValidationGroup layout={LabelsLeftLayout} invalid-bind="issue.invalid">
                <div class="project" style="width:385px"><Section>
                    <h3 style="margin:10px 10px">Project <span text-bind="selectedProjectName" /></h3>
                    <FlexCol>
                        <div layout={LabelsLeftLayout}>
                            <LookupField
                                label="Priority"
                                value-bind="selectedPrioriyId"
                                text-bind="selectedPriorityName"
                                options-bind="priorities"
                                value="selectedPriorityName"
                            />
                            <LookupField
                                label="Type"
                                value-bind="selectedTypeId"
                                text-bind="selectedTypeName"
                                options-bind="types"
                                value="selectedTypeName"
                            /> <LookupField
                                label="State"
                                value-bind="selectedStateId"
                                text-bind="selectedStateName"
                                options-bind="states"
                                value="selectedStateName"
                            />
                            <LookupField
                                label="Assignee"
                                value-bind="selectedAssigneeId"
                                text-bind="selectedAssigneeName"
                                options-bind="asignees"
                                value="selectedAssigneeName"
                            />
                            <LookupField
                                label="Version"
                                value-bind="selectedVersionId"
                                text-bind="selectedVersionName"
                                options-bind="versions"
                                value="selectedVersionName"
                            />
                            <DateField label="Due date"
                                minValue={new Date()}
                                value-bind="issue.duedate" />
                        </div>
                        <br />
                    </FlexCol>
                </Section></div>
            </ValidationGroup>
        </FlexRow>
    </main>
</cx >