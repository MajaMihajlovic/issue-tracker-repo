import { Controller } from "cx/ui";
import { GET, POST } from "../../api/methods";
import { showErrorToast, toast } from "../toasts";

export default (resolve) => class extends Controller {
    onInit() {
        this.loadUsers();
    }

    async loadUsers() {
        let users = await GET("user/getUsers");
        users = users.map(user => ({
            id: user.id,
            text: `${user.fullName} [${user.email}]`
        }));

        this.store.set('users', users);
        this.initCards(users);
    }

    async initCards(users) {
        let userCard = {
            id: 1,
            name: "All users",
            items: users
        }
        let selectedUsers = {
            id: 1,
            name: "Participants",
            items: []
        }
        let arr = [userCard, selectedUsers];
        this.store.set('cards', arr);
    }

    async save() {
        if (this.store.get("cards[1].items.length") == 0) {
            toast("Please select participants in project.");
            return;
        }
        var project = {
            name: this.store.get("new_project.name"),
            description: this.store.get("new_project.description"),
            photoUrl: this.store.get("new_project.photoUrl"),
        };
        let body = {
            project: project,
            list: this.store.get("cards[1].items")
        }

        try {
            this.store.set('status', 'loading');
            var result = await POST("project/insert", body, null);
            if (result != "Success") {
                showErrorToast(result);
                this.store.set('status', 'ok');
                resolve(false);
            }
            else {
                this.store.delete('new_project');
                toast("Project successfully added.");

                this.store.set('status', 'ok');
                resolve(true);
                this.instance.dismiss();
            }
        } catch (e) {
            showErrorToast(e);
            resolve(false);
        }
    }
}