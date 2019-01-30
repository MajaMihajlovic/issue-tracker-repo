import { Controller } from 'cx/ui';
import { showErrorToast, toast } from '../../../components/toasts';
import { POST, GET } from '../../../api/methods';
import { enableTooltips } from 'cx/widgets';

enableTooltips();

export default class extends Controller {
  async init() {
    super.init();
    var data = await getData("user/getUsers");
    this.store.set('users', data);
    initCards(data, this.store);
  }

  async save() {
    if (this.store.get("cards[1].items.length") == 0) {
      toast("Please select participants in project.");
      return;
    }
    var project = {
      name: this.store.get("new_project.name"),
      description: this.store.get("new_project.description"),
      photoUrl: this.store.get("new_project.pictureUrl"),
    };
    let body = {
      project: project,
      list: this.store.get("cards[1].items")
    }

    try {
      var result = await POST("project/insert", body, null);
      if (result != "Success") {
        showErrorToast(result);
      }
      else {
        this.store.delete('new_project');
        toast("Project successfully added.");
        var data = await getData("user/getUsers");
        this.store.set('users', data);
        initCards(data, this.store);
      }
    } catch (e) {
      showErrorToast(e);
    }
  };
}
async function initCards(data, store) {

  let userCard = {
    id: 1,
    name: "All users",
    items: data
  }
  let selectedUsers = {
    id: 1,
    name: "Participants",
    items: []
  }
  let arr = [];
  arr.push(userCard);
  arr.push(selectedUsers);
  store.set('cards', arr);
}
async function getData(path) {
  var result = await GET(path);
  var resultSet = [];
  if (result != null) {
    result.forEach(element => {
      resultSet.push({
        id: element.id,
        text: element.fullName + " [" + element.email + "]"
      });
    })
  }
  return resultSet;
}

