import { Route, RedirectRoute, PureContainer, Sandbox, HtmlElement } from 'cx/widgets';
import { FirstVisibleChildLayout } from 'cx/ui';

import { applyOuterLayout } from 'app/layouts/dynamicLayout';
import { MessageLayout } from 'app/layouts/MessageLayout';
import { PageNotFound } from './PageNotFound';

import SignRoutes from './sign';
import IssueRoutes from './issues';
import ProjectRoutes from './projects';
import DashboardRoutes from './dashboards';
import Default from './default';

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
            <Route route="~/" url-bind="url" items={Default} />
            <ProjectRoutes />
            <IssueRoutes />
            <DashboardRoutes />
            <PageNotFound />
        </PureContainer>

        <Route route="~/" url-bind="url" items={Default} />

        <RedirectRoute route="~/(*splat)" url-bind="url" redirect-tpl="~/" />

        <PageNotFound outerLayout={MessageLayout} />
    </Sandbox>
</cx>
