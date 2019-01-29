import { GET } from "../../../api/methods";
import { Controller } from "cx/ui";



export default class extends Controller {
    async init() {
        super.init();
        var dataSet = await GET("issue/getAllByProject/" + this.store.get('$route.id'));
        this.store.init("$page.page", 1);
        this.store.init("$page.pageSize", 10);
        this.store.init("$page.filter", { type: null, title: null, state: null, project: null, priority: null, version: null });

        this.addTrigger(
            "page",
            ["$page.pageSize", "$page.sorters", "$page.filter"],
            () => {
                this.store.set("$page.page", 1);
            },
            true
        );

        this.addTrigger(
            "pagination",
            ["$page.pageSize", "$page.page", "$page.sorters", "$page.filter"],
            (size, page, sorters, filter) => {
                setTimeout(() => {
                    var filtered = dataSet;
                    console.log("filtered" + filtered);
                    if (filter) {
                        if (filter.type) {
                            filtered = filtered.filter(
                                x => x.type.indexOf(filter.type) != -1
                            );
                        }

                        if (filter.title)
                            filtered = filtered.filter(
                                x => x.title.indexOf(filter.title) != -1
                            );

                        if (filter.state)
                            filtered = filtered.filter(
                                x => x.state.indexOf(filter.state) != -1
                            );
                        if (filter.priority)
                            filtered = filtered.filter(
                                x => x.priority.indexOf(filter.priority) != -1
                            );
                        if (filter.project)
                            filtered = filtered.filter(
                                x => x.project.indexOf(filter.project) != -1
                            );
                        if (filter.version)
                            filtered = filtered.filter(
                                x => x.version.indexOf(filter.version) != -1
                            );
                    }
                    /* var getComparer = getComparer(
                         (sorters || []).map(x => ({
                             value: { bind: x.field },
                             direction: x.direction
                         }))
                     );*/
                    // filtered.sort(compare);
                    this.store.set(
                        "$page.records",
                        filtered.slice((page - 1) * size, page * size)
                    );
                    this.store.set("$page.pageCount", Math.ceil(filtered.length / size));
                }, 100);
            },
            true
        );
    }
}
