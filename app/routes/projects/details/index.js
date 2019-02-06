import Controller from './Controller';
import { Link, ValidationGroup, FlexCol, TextArea, TextField, FlexRow, Text, Grid, Button, LookupField } from 'cx/widgets';
import { PropertySelection, expr, LabelsLeftLayout, LabelsTopLayout } from 'cx/ui';
import "./../index.scss"
export default <cx>
    <main controller={Controller} >
        <div putInto="header">
            <ul class="csb-breadcrumb">
                <li class="cse-breadcrumb-item">
                    <Link href="~/project/{id}">Projects</Link>
                </li>
            </ul>
        </div>

        <div>
            <FlexRow>
                <figure style="width:300px; heigth:250px; margin-inline-start: 20px; margin-inline-end: 20px;">
                    <img style="width:300px; heigth:250px; object-fit: cover" src-expr="{$page.projectDetails.photoUrl} || 'http://placehold.it/300x250'" alt="Photo" />
                </figure>
                <FlexCol style="width:600px; padding-top:15px;">
                    <TextField value-bind="$page.projectDetails.name"
                        label={{
                            visible: expr("{$page.mode}=='edit'"),
                            text: "Name"
                        }}
                        style="width:100%; min-width:10rem; font-size: 2rem"
                        mode-bind="$page.mode" />
                    <br />
                    <TextField
                        value-bind="$page.projectDetails.description"
                        style="width:100%; min-width:10rem; font-size: 1rem"
                        mode-bind="$page.mode"
                    />
                    <TextField
                        value-bind="$page.projectDetails.photoUrl"
                        visible-expr="{$page.mode} == 'edit'"
                        label="Photo URL"
                        style="width: 100%; max-width: 750px"
                    /><div layout={LabelsTopLayout}>
                        <LookupField
                            label="Participants"
                            value-bind="$page.selectedParticipantId"
                            text-bind="$page.selectedParticipantName"
                            visible-expr="{$page.mode} == 'edit'"
                            options-bind="$page.projectDetails.participants"
                            multiple={false}
                        />
                        <Button
                            visible-expr="{$page.mode} == 'edit'" onClick="addParticipant"
                        ><i style="padding-right:5px" class="fas fa-plus" />Add</Button>
                        <Button
                            visible-expr="{$page.mode} == 'edit'" onClick="delete"
                        ><i style="padding-right:5px" class="fas fa-trash-alt" />Remove </Button>
                    </div>
                    <hr />

                </FlexCol>

                <FlexCol style=" padding:20px;" >
                    <Button class="edit-button" visible-expr="{$page.mode}!='edit'" onClick="edit"><i style="padding-right:5px" class="fa fa-pencil-alt" /> Edit</Button>
                    <div style="box-sizing: border-box;  position: relative;  display: flex;  flex-direction: column;">
                        <Button class="edit-button" visible-expr="{$page.mode}=='edit'" onClick="save"><i style="padding-right:5px" class="fas fa-check" /> Save</Button>
                        <Button class="edit-button" visible-expr="{$page.mode}=='edit'" onClick="cancel"><i style="padding-right:5px" class="fas fa-times" /> Cancel</Button>

                    </div></FlexCol>
            </FlexRow>

            <Grid
                records-bind="$page.projectDetails.users"
                selection={{ type: PropertySelection, bind: "$page.selection", multiple: false }}
                label="Participants"
                style={{ width: "960px", padding: "20px" }}
                lockColumnWidths
                multi
                columns={[
                    {
                        field: "fullName",
                        sortable: true,
                        header1: "Name",
                        header2: {
                            allowSorting: false,
                            items: (
                                <TextField
                                    value-bind="$page.filter.fullName"
                                    reactOn="enter blur"
                                    style="width:100%"
                                />
                            )
                        }
                    },
                    {
                        header1: "E-mail",
                        header2: {
                            items: (
                                <TextField
                                    value-bind="$page.filter.email"
                                    reactOn="enter blur"
                                    style="width:100%"
                                />
                            )
                        },
                        field: "email"
                    }

                ]}
                remoteSort

            />
        </div>
    </main>
</cx >