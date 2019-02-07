import { Menu, Link, Text, Submenu } from 'cx/widgets';

import { Glyph } from 'app/components/Glyph';

import { openSettingsWindow } from './SettingsWindow';
import { openChangePasswordWindow } from './EditPasswordWindow';
import { computable } from 'cx/ui';

export const UserInfo = <cx>
    <Menu horizontal>
        <Submenu>
            <a style="font-weight:bold; font-size:15px;"  preserveWhitespace class="csb-user">
                <Text  bind="user.username"  />
                <img style="margin-left:10px; display: inline-block; width: 35px; height: 35px; border-radius: 50%; background-repeat: no-repeat; 
                    font-weight:bold; background-position: center center; vertical-align: middle; background-size: cover; " src-tpl={"data:image/jpg;base64, {user.photo}"} alt="" />
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
