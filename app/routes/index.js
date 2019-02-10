import { Route, RedirectRoute, PureContainer, Sandbox } from 'cx/widgets';
import { FirstVisibleChildLayout } from 'cx/ui';

import { applyOuterLayout } from 'app/layouts/dynamicLayout';
import { MessageLayout } from 'app/layouts/MessageLayout';
import { PageNotFound } from './PageNotFound';

import SignRoutes from './sign';
import Default from './default';
import AssignedToMe from './issues'
import MyProjects from './projects';
import ProjectDetails from './projects/details';
import IssueDetails from './issues/details'

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
            <Route route="~/issues(/)" url-bind="url">
                <AssignedToMe />
            </Route>
            <Route route="~/issues/:id" url-bind="url">
                <IssueDetails />
            </Route>
            <Route route="~/projects/" url-bind="url">
                <MyProjects />
            </Route>
            <Route route="~/projects/:id" url-bind="url">
                <ProjectDetails />
            </Route>
            <Route route="~/dashboards/" url-bind="url">
                <Default />
            </Route>
            <PageNotFound />
        </PureContainer>

        <Route route="~/" url-bind="url" items={Default} />

        <RedirectRoute route="~/(*splat)" url-bind="url" redirect-tpl="~/" />

        <PageNotFound outerLayout={MessageLayout} />
    </Sandbox>
</cx>
