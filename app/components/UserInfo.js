import { Menu, Link, Text, Submenu } from 'cx/widgets';

import { Glyph } from 'app/components/Glyph';

import { openSettingsWindow } from './SettingsWindow';
import { openChangePasswordWindow } from './EditPasswordWindow';
import { computable } from 'cx/ui';

export const UserInfo = <cx>
    <Menu horizontal>
        <Submenu>
            <a preserveWhitespace class="csb-user">
                <img style=" display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;

  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover; " src-tpl={"data:image/jpg;base64, {user.photo}"} alt="User image" />
                <Text bind="user.username" />
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
