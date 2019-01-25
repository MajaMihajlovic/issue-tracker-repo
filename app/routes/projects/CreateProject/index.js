import {
    Button,
    TextField,
    ValidationGroup,
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
                    <Link href="~/project">Projects</Link>
                </li>
            </ul>
        </div>
        <FlexRow>
            <figure>
                <img style="width:200px; heigth:200px; object-fit: cover" src-expr="{new_project.pictureUrl} || 'http://placehold.it/200x200'" alt="Photo" />
            </figure>
            <ValidationGroup layout={LabelsLeftLayout} invalid-bind="new_project.invalid">
                <form>
                    <FlexCol style="width:600px">
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
                </form>
            </ValidationGroup>
        </FlexRow>
    </main>
</cx>