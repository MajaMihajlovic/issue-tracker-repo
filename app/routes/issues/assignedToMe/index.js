import {
    Button, TextArea,
    TextField,
    ValidationGroup, LookupField, Section,
    FlexRow,
    FlexCol, Link, DateField, UploadButton, Repeater, MsgBox, Grid, Pagination, Select, DateTimeField, Text, openContextMenu, Menu
} from 'cx/widgets';
import Controller from './Controller';
import "./index.scss"
import { openIssueWindow } from '../../../components/IssueWindow';
import { PropertySelection } from 'cx/ui';
export default <cx>
    <main controller={Controller} >
        <div putInto="header">
            <ul class="csb-breadcrumb">
                <li class="cse-breadcrumb-item">
                    <Link href="~/issues/">Issues</Link>
                </li>
            </ul>
        </div>
        <FlexRow spacing style=" width: 100%;  height:45px">
            <h3 style="color: #24b5d6; margin:15px">Assigned to me</h3>
            <div style=" position: absolute; right: 0;">
                <Link onClick={async (e, { store }) => {
                    openIssueWindow(store); e.preventDefault();
                }}
                    style="font-size:30px; margin:10px" href="#"><i class="fa fa-plus" /></Link></div>
        </FlexRow>
        <Grid
            records-bind="$page.records"
            selection={{ type: PropertySelection, bind: "$page.selection", multiple: false }}
            style={{ width: "100%" }}
            mod="bordered"
            lockColumnWidths
            onRowContextMenu={(e, { store }) => openContextMenu(e, <cx>
                <Menu controller={Controller}>
                    <a style="padding-left:10px" onClick="edit" href="#"><i style="padding-right:5px" class="fas fa-pencil-alt" />  Edit</a>
                </Menu>
            </cx>, store)}
            columns={[
                {
                    field: "type",
                    sortable: true,
                    header1: "Type",
                    header2: {
                        allowSorting: false,
                        items: (
                            <TextField
                                value-bind="$page.filter.type"
                                reactOn="enter blur"
                                style="width:100%"
                            />
                        )
                    }
                },
                {
                    header1: "Title",
                    header2: {
                        items: (
                            <TextField
                                value-bind="$page.filter.title"
                                reactOn="enter blur"
                                style="width:100%"
                            />
                        )
                    },
                    field: "title"
                },
                {
                    header1: "State",
                    header2: {
                        items: (
                            <TextField
                                value-bind="$page.filter.state"
                                reactOn="enter blur"
                                style="width:100%"
                            />
                        )
                    },
                    field: "state",
                    sortable: true
                },
                {
                    header1: "Priority",
                    header2: {
                        items: (
                            <TextField
                                value-bind="$page.filter.priority"
                                reactOn="enter blur"
                                style="width:100%"
                            />
                        )
                    },
                    field: "priority",
                    sortable: true,
                    className: "$page.record.priority".toLowerCase(), //treba nesto smisliti ovjde

                    class: "priority",
                },
                {
                    header1: "Due date",
                    format: 'datetime',
                    header2: {
                        items: (
                            <DateTimeField
                                value-bind="$page.filter.duedate"
                                reactOn="enter blur"
                                style="width:100%"
                            />
                        )
                    },
                    field: "duedate",
                },
                {
                    header1: "Project",
                    header2: {
                        items: (
                            <TextField
                                value-bind="$page.filter.projectName"
                                reactOn="enter blur"
                                style="width:100%"
                            />
                        )
                    },
                    field: "projectName",
                    sortable: true
                },
                {
                    header1: "Version",
                    header2: {
                        items: (
                            <TextField
                                value-bind="$page.filter.version"
                                reactOn="enter blur"
                                style="width:100%"
                            />
                        )
                    },
                    field: "version",
                    sortable: true
                }
            ]}
            sorters-bind="$page.sorters"
            remoteSort
        />
        <div style={{ marginTop: "40px", marginRight: "20px", float: "right" }}>
            <Pagination page-bind="$page.page" pageCount-bind="$page.pageCount" />
            <Select value-bind="$page.pageSize" style={{ marginLeft: "20px", float: "right" }}>
                <option value="5">5</option>
                <option value={10}>10</option>
                <option value="20">20</option>
                <option value="50">50</option>
            </Select>
        </div>
    </main>
</cx >