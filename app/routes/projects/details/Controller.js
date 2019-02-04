import { Controller } from "cx/ui";
import { GET, PUT } from "../../../api/methods";
import { showErrorToast, toast } from "../../../components/toasts";

export default class extends Controller {
    onInit() {
        this.loadProject(this.store);
        this.store.set("$page.mode", "view")
        this.store.init("$page.filter", { fullName: null, email: null });
        var dataSet = this.store.get("projectDetails.users");
        this.addTrigger(
            "pagination",
            ["$page.filter"],
            (filter) => {
                setTimeout(() => {
                    var filtered = dataSet;
                    if (filter) {
                        if (filter.fullName) {
                            filtered = filtered.filter(
                                x => x.fullName.indexOf(filter.fullName) != -1
                            );
                        }

                        if (filter.email)
                            filtered = filtered.filter(
                                x => x.email.indexOf(filter.email) != -1
                            );
                    }
                    this.store.set(
                        "$page.records", filtered
                    );
                })
            }, true)

    }

    async loadProject(store) {
        var result = await GET("project/" + store.get("$route.id"));
        store.set('projectDetails', result);
        var users = await GET("user/getParticipants/" + store.get("$route.id"), "text");
        store.set('projectDetails.users', users);
        return users;
    }

    edit(e) {
        e.preventDefault();
        this.store.set('$page.mode', 'edit');
    }

    async save(e) {
        console.log("save");
        var project = {
            name: this.store.get("projectDetails.name"),
            description: this.store.get("projectDetails.description"),
            photoUrl: this.store.get("projectDetails.photoUrl"),
        };
        try {
            var result = await PUT("project/" + this.store.get("$route.id"), project, null);
            console.log(result)
            if (result != "Success") {
                showErrorToast(result);
            }
            else {

                toast("Project successfully updated.");
                this.store.set('$page.mode', 'view');
                //  var data = await getData("user/getUsers");
                // store.set('users', data);
            }
        } catch (e) {
            showErrorToast(e);
        }
    }
    cancel(e) {
        e.preventDefault();
        this.store.set('$page.mode', 'view');
        this.loadProject(this.store)
    }

}