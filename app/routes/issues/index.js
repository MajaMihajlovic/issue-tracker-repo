import { Route } from 'cx/widgets';

import AssignedToMe from './assignedToMe';
import AddIssue from './addIssue';
import ProjectIssue from './projectIssues';
export default <cx>
    <Route route="~/issues/" url-bind="url">
        <AssignedToMe />
    </Route>

    <Route route="~/issues/create" url-bind="url">
        <AddIssue />
    </Route>
    <Route route="~/issue/project/:id" url-bind="url">
        <ProjectIssue />
    </Route>
</cx>;