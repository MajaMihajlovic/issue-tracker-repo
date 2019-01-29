import { Controller } from 'cx/ui';
import { showErrorToast, toast } from '../../../components/toasts';
import { POST, GET } from '../../../api/methods';
import { enableTooltips } from 'cx/widgets';

enableTooltips();

export default class extends Controller {
  async init() {
    super.init();
    var data = await getData("user/getUsers");
    this.store.set("users", data)
  }

  async save() {
    var project = {
      name: this.store.get("new_project.name"),
      description: this.store.get("new_project.description"),
      photoUrl: this.store.get("new_project.pictureUrl"),
    };

    try {
      var result = await POST("project/insert", project, null);
      console.log(result)
      if (result != "Success") {
        showErrorToast(result);
      }
      else {
        this.store.delete('new_project');
        toast("Project successfully added.")
      }
    } catch (e) {
      showErrorToast(e);
    }
  };
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

