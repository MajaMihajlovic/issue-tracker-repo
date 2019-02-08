import { GET } from "../../api/methods";
import { Controller, History, Url } from "cx/ui";
import { openIssueWindow } from "../../components/issueWindow/index";
export default class extends Controller {
    init() {
        this.store.init("$page.page", 1);
        this.store.init("$page.pageSize", 20);

        this.loadAll();

        this.addTrigger("page", ["$page.pageSize"], () => { this.store.set("$page.page", 1) });
        this.addTrigger("filter", ["issues", "$page.pageSize", "$page.page", "$page.filter"], (issues, size, page, filter) => {
            if (!issues)
                return;

            if (filter)
                issues = filterIssues(issues, filter);

            this.store.set("$page.records", issues.slice((page - 1) * size, page * size));
            this.store.set("$page.pageCount", Math.ceil(issues.length / size));
        }, true);

        this.addTrigger("selectedProjectId", ["$page.selectedProjectId"], (projectId) =>
            History.pushState({}, null, Url.resolve(projectId ? `~/issues?projectId=${projectId}` : "~/issues/")));

        this.addTrigger("selectedAssigneeId", ["$page.selectedAssigneeId"], () => this.loadIssues());
    }

    async loadAll() {
        await Promise.all([this.loadProjects(), this.loadAssignees()]);
        this.loadIssues();
    }

    async loadIssues() {
        let urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('projectId');
        if (!this.store.get('$page.selectedProjectId') && projectId)
            this.store.set('$page.selectedProjectId', projectId);

        let assigneeId = this.store.get("$page.selectedAssigneeId");

        if (!projectId && !assigneeId) {
            var issues = await GET("issue/getAll/")
        } else if (!assigneeId) {
            var issues = await GET("issue/getAllByProject/" + projectId);
        } else if (!projectId) {
            var issues = await GET("issue/getAll/" + assigneeId);
        } else {
            var issues = await GET(`issue/getAllByProjectAndAssignee/${projectId}/${assigneeId}`);
        }

        this.store.set('issues', issues)
    }

    openDetails() {
        History.pushState({}, null, Url.resolve("~/issues/" + this.store.get("$page.selectedIssue")));
    }

    async addIssue() {
        openIssueWindow();
    }

    edit() {
        let issueId = this.store.get("$page.selectedIssue");
        openIssueWindow(issueId);
    }

    async loadProjects() {
        let projects = await GET("project");
        this.store.set('$page.projects', projects);
    }

    async loadAssignees() {
        let assignees = await GET("user");
        this.store.set('$page.assignees', assignees);
    }
}

function filterIssues(issues, filter) {
    issues = filterIssuesByStringProperty(issues, filter, 'type');
    issues = filterIssuesByStringProperty(issues, filter, 'title');
    issues = filterIssuesByStringProperty(issues, filter, 'state');
    issues = filterIssuesByStringProperty(issues, filter, 'priority');
    issues = filterIssuesByStringProperty(issues, filter, 'assigneeFullName');
    issues = filterIssuesByStringProperty(issues, filter, 'version');
    issues = filterIssuesByStringProperty(issues, filter, 'assignee');
    issues = filterIssuesByStringProperty(issues, filter, 'description');

    if (filter.duedate)
        issues = filterIssuesByDueDate(issues, filter);

    return issues;
}

function filterIssuesByStringProperty(issues, filter, filterProp) {
    let filteredIssues = [...issues];
    if (filter[filterProp]) {
        filteredIssues = issues.filter(x => {
            if (!x[filterProp])
                return;

            return x[filterProp].toLowerCase().indexOf(filter[filterProp].toLowerCase()) != -1;
        });
    }

    return filteredIssues;
}

function filterIssuesByDueDate(issues, filter) {
    let dueDate = new Date(filter.duedate).toDateString()

    let filteredIssues = [...issues];
    filteredIssues = issues.filter(i => {
        if (!i.duedate)
            return;

        return new Date(i.duedate).toDateString() == dueDate;
    });

    return filteredIssues;
}