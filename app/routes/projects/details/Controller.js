import { Controller } from "cx/ui";
import { GET, PUT, POST, DELETE } from "../../../api/methods";
import { showErrorToast, toast } from "../../../components/toasts";

export default class extends Controller {
    onInit() {
        this.loadProject(this.store);
        this.store.set("$page.mode", "view")
        this.store.init("$page.filter", { fullName: null, email: null });
        var dataSet = this.store.get("$page.projectDetails.users");
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

    async addParticipant() {
        let id = this.store.get("$page.selectedParticipantId");
        if (id != null) {
            let user = await GET("user/" + id);
            let newUser = {
                id: this.store.get("$page.selectedParticipantId"),
                fullName: this.store.get("$page.selectedParticipantName"),
                email: user.email
            }
            this.store.update("$page.newUsers", (newUsers = []) => {
                return [...newUsers, newUser]
            });
            this.store.update("$page.projectDetails.users", (existingUsers = []) => {
                return [
                    ...existingUsers,
                    newUser
                ];
            });

            this.store.update('$page.projectDetails.participants', records => records.filter(r => r.id != newUser.id))
            this.store.delete("$page.selectedParticipantId");
            this.store.delete("$page.selectedParticipantName");
        }
    }

    async loadProject(store) {
        try {
            var result = await GET("project/" + store.get("$route.id"));
            store.set('$page.projectDetails', result);
            var users = await GET("user/getParticipants/" + store.get("$route.id"), "text");
            store.set('$page.projectDetails.users', users);
        } catch (e) {
            console.log(e)
            store.set('$page.projectDetails.users', []);
        }
        return users;
    }

    async edit(e) {
        e.preventDefault();
        var result = await GET("user/getNonParticipants/" + this.store.get("$page.projectDetails.id"));
        var newResult = [];
        result.forEach(element => {
            newResult.push({
                id: element.id,
                text: element.fullName,
            });
        });

        this.store.set("$page.projectDetails.participants", newResult)
        this.store.set('$page.mode', 'edit');
    }

    async save(e) {
        var users = this.store.get("$page.newUsers");
        let resultSet = []
        if (users) {
            users.forEach(element => {
                resultSet.push({
                    id: element.id,
                    text: element.fullName + " [" + element.email + "]"
                });
            })
        }
        var project = {
            id: this.store.get("$route.id"),
            name: this.store.get("$page.projectDetails.name"),
            description: this.store.get("$page.projectDetails.description"),
            photoUrl: this.store.get("$page.projectDetails.photoUrl"),
        };
        let body = {
            project: project,
            list: resultSet
        }
        try {

            var result = await PUT("project/update", body, null);
            if (result != "Success") {
                showErrorToast(result);
            }
            else {
                toast("Project successfully updated.");
                this.store.set('$page.mode', 'view');
            }
        } catch (e) {
            showErrorToast(e);
        }
        this.store.delete('$page.newUsers');
        this.store.delete('$page.projectDetails.participants');
        this.store.delete("$page.selectedParticipantName");
        this.store.delete("$page.selectedParticipantId");

    }

    async delete() {
        var users = this.store.get("$page.projectDetails.users");
        let removeUser;
        if (users) {
            users.forEach(element => {
                if (element.selected) {
                    removeUser = element;
                }
            })
        }
        if (removeUser) {
            let result = await DELETE("project-has-user/" + removeUser.id + "/" + this.store.get("$route.id"))
            if (result == "Success") {
                this.store.update('$page.projectDetails.users', records => records.filter(r => r.id != removeUser.id))
            } else {
                toast(result);
            }
        } else {
            showErrorToast("Please select user and then press button Delete.")
        }
    }

    cancel(e) {
        e.preventDefault();
        this.store.set('$page.mode', 'view');
        this.loadProject(this.store)
    }

}
