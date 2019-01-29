import { Text, Link, Repeater, MenuItem, Menu, Submenu, openContextMenu } from 'cx/widgets';
import { FirstVisibleChildLayout, PropertySelection } from 'cx/ui';
import Controller from './Controller';
import "./index.scss"

export default <cx>
    <main controller={Controller} class="b-list">
        <div putInto="header">
            <ul class="csb-breadcrumb">
                <li class="cse-breadcrumb-item">
                    <Link href="~/project">Projects</Link>
                </li>
            </ul>
        </div>
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
                No records found matching the given search criteria.
            </div>

            <Repeater
                records-bind='list.data'
                recordName="$project"
                idField="id"
            >
                <div class="b-card" onContextMenu={(e, { store }) => openContextMenu(e, <cx>
                    <Menu>
                        <a style="padding-left:10px" href="#"><i style="padding-right:5px" class="fas fa-trash-alt"></i>  Close</a>
                        <a style="padding-left:10px" href="#"><i style="padding-right:5px" class="fas fa-pencil-alt" />  Edit</a>
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


</cx>