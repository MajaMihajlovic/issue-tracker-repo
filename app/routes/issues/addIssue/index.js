import {
    Button, TextArea,
    TextField,
    ValidationGroup, LookupField, Section,
    FlexRow,
    FlexCol, Link
} from 'cx/widgets';
import { LabelsLeftLayout } from 'cx/ui';

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
                    value-bind="new_project.description"
                    label="Description"
                    style="width: 100%; max-width: 950px"
                    rows={10}
                /></FlexCol>
            <ValidationGroup layout={LabelsLeftLayout} invalid-bind="new_project.invalid">
                <div class="project"><Section>
                    <h3 style="margin:10px 0">Project <span text-bind="selectedProjectName" /></h3>
                    <FlexCol style="width:300px">
                        <TextField
                            value-bind="new_project.name"
                            label="Name"
                            style="width: 100%; max-width: 950px"
                            asterisk
                            required
                        />
                        <TextField
                            value-bind="new_project.description"
                            label="Description"
                            style="width: 100%; max-width: 750px"
                            asterisk
                            required
                        />
                        <TextField
                            value-bind="new_project.pictureUrl"
                            label="Photo URL"
                            style="width: 100%; max-width: 750px"
                        />

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
                                disabled-bind="new_project.invalid"
                                mod="primary"
                            />
                        </FlexRow>

                    </FlexCol>
                </Section></div>
            </ValidationGroup>
        </FlexRow>
    </main>
</cx>