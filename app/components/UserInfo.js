import { HtmlElement, Menu, Link, Text, Submenu } from 'cx/widgets';

import { Glyph } from 'app/components/Glyph';




import { openSettingsWindow } from './SettingsWindow';
import { openChangePasswordWindow } from './EditPasswordWindow';

export const UserInfo = <cx>
    <Menu horizontal>
        <Submenu>
            <a preserveWhitespace class="csb-user">
                <Glyph name="user" /> <Text bind="user.fullName" />
            </a>

            <Menu putInto="dropdown">
                <a class="cxm-menu-pad" href="#" onClick={(e, { store }) => { openSettingsWindow(store); e.preventDefault(); }}>Edit profile</a>
                <a class="cxm-menu-pad" href="#" onClick={(e, { store }) => { openChangePasswordWindow(store); e.preventDefault(); }}>Change password</a>

                <hr />
                <Link mod="menu-pad" href="~/sign/out">Sign Out</Link>
            </Menu>
        </Submenu>
    </Menu>
</cx>
