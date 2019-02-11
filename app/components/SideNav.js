import { List, Text, Link } from 'cx/widgets';
import { Controller, History, Url } from 'cx/ui';
import NavTree from './NavTree';

class CController extends Controller {
    init() {
        super.init();
        this.store.init('contents', NavTree);
    }
}

const onItemClick = (e, { store }) => {
    e.preventDefault();
    e.stopPropagation();
    var record = store.get('$topic');
    if (record.url)
        History.pushState({}, null, Url.resolve(record.url));
    else
        store.set('$topic.expanded', !record.expanded);
    return false;
};

export const SideNav = <cx>
    <List mod="sidenav"
        controller={CController}
        records-bind="contents"
        recordName="$topic"
        onItemClick={onItemClick}
        itemClassName={{
            "cxs-selected": { expr: '{url}=={$topic.url}' }
        }}
    >
        <div class="csb-sidenavtopic">
            <Link
                href-bind="$url"
                url-bind="url"
                match="prefix"
                mod="sidenav">
                <img style="margin-right:15px; align: center; width:40px; height:40px margin-bottom:0px;padding-bottom:0" src-expr="{$topic.icon}"></img>

                <Text style="align: center; " bind="$topic.topic" />
            </Link>

        </div>

    </List>
</cx >;
