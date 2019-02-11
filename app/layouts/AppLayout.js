import { ContentPlaceholder } from 'cx/ui';
import { GlobalCacheIdentifier } from 'cx/util';
import { SideNav } from 'app/components/SideNav';
import { UserInfo } from 'app/components/UserInfo';

function toggleMenu(e, { store }) {
    store.toggle('layout.menu.hide');
    GlobalCacheIdentifier.change(); //redraw contents
}

export const AppLayout = <cx>
    <div class={{ "csb-applayout": true, 'css-hide-menu': { bind: 'layout.menu.hide' } }}>
        <header class="cse-applayout-header">
            <img class="cse-applayout-logo" src="~/app/assets/img/logo.png"></img>
            <div class="cse-applayout-headercontent">
                <div class="cse-applayout-menu" onClick={toggleMenu}><i class="csb-cssicon-menu"></i></div>
                <div class="cse-applayout-customheader">
                    <ContentPlaceholder name="" />
                </div>
                <div class="cse-applayout-user">
                    <UserInfo />
                </div>
            </div>
        </header>
        <div class="cse-applayout-content">
            <aside class="cse-applayout-nav">
                <SideNav />
            </aside>
            <ContentPlaceholder />
        </div>
    </div>
</cx>;
