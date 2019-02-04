import Controller from './Controller';
import { Link, ValidationGroup, FlexCol, TextArea, TextField, FlexRow, Text, Grid, Button } from 'cx/widgets';
import { PropertySelection, expr } from 'cx/ui';
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
                <figure style="width:300px; heigth:200px; margin-inline-start: 20px; margin-inline-end: 20px;">
                    <img style="width:300px; heigth:200px; object-fit: cover" src-expr="{projectDetails.photoUrl} || 'http://placehold.it/300x200'" alt="Photo" />
                </figure>
                <FlexCol style="width:600px; padding-top:15px;">
                    <TextField value-bind="projectDetails.name"
                        //label-expr="{$page.mode}=='edit' ? 'maja':''"
                        label={{
                            visible: expr("{$page.mode}=='edit'"),
                            text: "Name"
                        }}
                        style="width:100%; min-width:10rem; font-size: 2rem"
                        mode-bind="$page.mode" />
                    <br />
                    <TextField
                        value-bind="projectDetails.description"
                        style="width:100%; min-width:10rem; font-size: 1rem"
                        mode-bind="$page.mode"
                    />
                    <TextField
                        value-bind="projectDetails.photoUrl"
                        visible-expr="{$page.mode} == 'edit'"
                        label="Photo URL"
                        style="width: 100%; max-width: 750px"
                    />
                    <hr />
                </FlexCol>
                <span></span>

                <FlexCol style="width:100%; padding-top:10px;" >
                    <Button class="edit-button" visible-expr="{$page.mode}!='edit'" onClick="edit"><i style="padding-right:5px" class="fa fa-pencil-alt" /> Edit</Button>
                    <div style="box-sizing: border-box;  position: relative;  display: flex;  flex-direction: column;">
                        <Button class="edit-button" visible-expr="{$page.mode}=='edit'" onClick="save"><i style="padding-right:5px" class="fas fa-check" /> Save</Button>
                        <Button class="edit-button" visible-expr="{$page.mode}=='edit'" onClick="cancel"><i style="padding-right:5px" class="fas fa-times" /> Cancel</Button>

                    </div></FlexCol>
            </FlexRow>
            <Grid
                records-bind="$page.records"
                style={{ width: "750px", padding: "20px" }}
                lockColumnWidths
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