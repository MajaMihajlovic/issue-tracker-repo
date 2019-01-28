import {
    Button, TextArea,
    TextField,
    ValidationGroup, LookupField, Section,
    FlexRow,
    FlexCol, Link, DateField, UploadButton, Repeater, MsgBox, Grid, Pagination, Select
} from 'cx/widgets';
import Controller from './Controller';
import "./index.scss"
export default <cx>
    <main controller={Controller} >
        <div putInto="header">
            <ul class="csb-breadcrumb">
                <li class="cse-breadcrumb-item">
                    <Link href="~/issues/">Issues</Link>
                </li>
            </ul>
        </div>
        <Grid
            records-bind="$page.records"
            style={{ width: "100%" }}
            mod="bordered"
            lockColumnWidths
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
                    header1: "Phone",
                    header2: {
                        items: (
                            <TextField
                                value-bind="$page.filter.phone"
                                reactOn="enter blur"
                                style="width:100%"
                            />
                        )
                    },
                    field: "phone"
                },
                {
                    header1: "City",
                    header2: {
                        allowSorting: false,
                        items: (
                            <TextField
                                value-bind="$page.filter.city"
                                reactOn="enter blur"
                                style="width:100%"
                            />
                        )
                    },
                    field: "city",
                    sortable: true
                }
            ]}
            sorters-bind="$page.sorters"
            remoteSort
        />
        <div style={{ marginTop: "20px" }}>
            <Pagination page-bind="$page.page" pageCount-bind="$page.pageCount" />
            <Select value-bind="$page.pageSize" style={{ float: "right" }}>
                <option value="5">5</option>
                <option value={10}>10</option>
                <option value="20">20</option>
                <option value="50">50</option>
            </Select>
        </div>
    </main>
</cx >