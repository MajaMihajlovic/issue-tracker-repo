import { Text, Link, Repeater, MenuItem, Menu, Submenu, openContextMenu, MonthField, Section, FlexRow, TextField, Button } from 'cx/widgets';
import { FirstVisibleChildLayout, PropertySelection } from 'cx/ui';
import Controller from './Controller';
import "./index.scss"
import { openProjectWindow } from '../../../components/ProjectWindow';

export default <cx>
    <main controller={Controller} class="b-list">
        <div putInto="header">
            <ul class="csb-breadcrumb">
                <li class="cse-breadcrumb-item">
                    <Link href="~/project">Projects</Link>
                </li>
            </ul>
        </div>
        <Section mod="card">
            <FlexRow spacing>
                <TextField
                    value-bind="search.query"
                    placeholder="Search..."
                    style="font-size:30px; width: 100%; max-width: 720px; height:35px"
                    icon="search"
                /><div style=" position: absolute; right: 0;">
                    <Link onClick={async (e, { store }) => {
                        openProjectWindow(store); e.preventDefault();
                    }}
                        style="font-size:30px" href="#"><i class="fa fa-plus" /></Link></div>
            </FlexRow>
        </Section>
        <div
            class="b-cards"
            layout={FirstVisibleChildLayout}
        >
            <div
                class="e-cards-empty"
                visible-expr="{list.loading}">
                Loading...
            </div>

            <div
                class="e-cards-empty"
                visible-expr="!{list.data} || {list.data}.length == 0"
            >
            </div>

            <Repeater
                records-bind='list.data'
                recordName="$project"
                idField="id"
            >
                <div class="b-card" onContextMenu={(e, { store }) => openContextMenu(e, <cx>
                    <Menu controller={Controller}>
                        <a style="padding-left:10px" onClick="delete" href="#"><i style="padding-right:5px" class="fas fa-trash-alt"></i>  Delete</a>
                        <a style="padding-left:10px" onClick="finish" href="#"><i style="padding-right:5px" class="fas fa-check"></i>  Mark as finished</a>
                        <a style="padding-left:10px" onClick="edit" href="#"><i style="padding-right:5px" class="fas fa-pencil-alt" />  Edit</a>
                    </Menu>
                </cx>, store)}>
                    <div class="e-card-img" >
                        <figure >
                        </figure>
                        <img
                            src-expr="{$project.photoUrl} || '~/app/assets/img/projectManagement.jpg'"
                            alt="Project photo"
                        />
                    </div>

                    <div class="e-card-details">
                        <Link href-tpl="~/issue/project/{$project.id}">
                            <h3 text-tpl="{$project.name}" />
                        </Link>

                        <div style="  white-space: wrap; height: 3.6em; overflow: hidden;  text-overflow: -o-ellipsis-lastline;">
                            <i class="fa fa-newspaper"></i>
                            <Text bind="$project.description" />
                        </div>
                        <Link href-tpl="~/issue/project/{$project.id}">
                            <u text-tpl="Issues" />
                        </Link>

                    </div>
                </div>
            </Repeater>
        </div>
    </main>


</cx >