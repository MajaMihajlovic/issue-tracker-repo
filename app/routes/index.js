import { Route, RedirectRoute, PureContainer, Sandbox, HtmlElement } from 'cx/widgets';
import { FirstVisibleChildLayout } from 'cx/ui';

import {applyOuterLayout} from 'app/layouts/dynamicLayout';
import {MessageLayout} from 'app/layouts/MessageLayout';
import {PageNotFound} from './PageNotFound';

import SignRoutes from './sign';
import ProjectRoutes from './projects';
import LayoutRoutes from './layouts';
import DashboardRoutes from './dashboards';
import AdminRoutes from './admin';

import Default from './default';
import MetaRoutes from './meta';

export default <cx>
    <Sandbox key-bind="url"
        storage-bind="pages"
        recordName="$page"
        layout={FirstVisibleChildLayout}
    >
        {/*always active routes*/}
        <SignRoutes />

        <PureContainer visible-expr="!!{user}" layout={FirstVisibleChildLayout} onExplore={applyOuterLayout}>
            {/*signed in routes*/}
            <Route route="~/" url-bind="url" items={Default}/>
            <ProjectRoutes />
            <AdminRoutes />
            <LayoutRoutes/>
            <DashboardRoutes />
            <MetaRoutes />
            <PageNotFound />
        </PureContainer>

        <Route route="~/" url-bind="url" items={Default} />

        <RedirectRoute route="~/(*splat)" url-bind="url" redirect-tpl="~/sign/in"/>

        <PageNotFound outerLayout={MessageLayout}/>
    </Sandbox>
</cx>
