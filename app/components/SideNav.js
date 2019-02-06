import { HtmlElement, List, Repeater, Text, Link, Menu, TreeAdapter } from 'cx/widgets';
import { Controller, KeySelection, History, Url } from 'cx/ui';
import { updateArray } from 'cx/data';
import NavTree from './NavTree';
import { Glyph } from 'app/components/Glyph';

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
                <img style="margin-right:15px;width:30px; height:30px" src-expr="{$topic.icon}"></img>
                <Text style="padding: 5px" bind="$topic.topic" />
            </Link>

        </div>

    </List>
</cx>;
