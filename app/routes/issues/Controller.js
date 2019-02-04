import { GET } from "../../api/methods";
import { Controller } from "cx/ui";
import { openIssueWindow } from "../../components/IssueWindow";
// import { URLSearchParams } from "url";
export default class extends Controller {
    async init() {
        this.loadData();
        this.store.init("$page.page", 1);
        this.store.init("$page.pageSize", 10);
        // this.store.init("$page.filter", { type: null, title: null, state: null, priority: null, version: null, assigneeFullName: null });

        this.addTrigger("page", ["$page.pageSize"], () => this.store.set("$page.page", 1), true);

        this.addTrigger("filter", ["issues", "$page.pageSize", "$page.page", "$page.filter"], (issues, size, page, filter) => {
            if (!issues)
                return;

            if (filter)
                issues = filterIssues(issues, filter);

            this.store.set("$page.records", issues.slice((page - 1) * size, page * size));
            this.store.set("$page.pageCount", Math.ceil(issues.length / size));
        }, true);
    }

    async loadData() {
        let user = sessionStorage.getItem('user') || localStorage.getItem('user');
        var id = JSON.parse(user).id;
        const urlParams = new URLSearchParams(this.store.get('url').split("?")[1]);
        const projectId = urlParams.get('projectId');
        let issues = projectId ? await GET("issue/getAllByProject/" + projectId) : await GET("issue/getAll/" + id);

        this.store.set('issues', issues)
    }

    async addIssue() {
        openIssueWindow(this.store);
    }

    edit() {
        this.store.set("editIssue", true);
        openIssueWindow(this.store);
    }
}

function filterIssues(issues, filter) {
    issues = filterIssuesByStringProperty(issues, filter, 'type');
    issues = filterIssuesByStringProperty(issues, filter, 'title');
    issues = filterIssuesByStringProperty(issues, filter, 'state');
    issues = filterIssuesByStringProperty(issues, filter, 'priority');
    issues = filterIssuesByStringProperty(issues, filter, 'assigneeFullName');
    issues = filterIssuesByStringProperty(issues, filter, 'version');

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