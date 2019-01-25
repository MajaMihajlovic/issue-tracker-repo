import { Controller, History, Url } from "cx/ui";
import { POST } from "../../../api/methods";
import { toast, showErrorToast } from "../../../components/toasts";

export default class extends Controller {

  async signIn() {

    console.log("file" + this.store.get('sign_in.file'));

    try {
      var data = new FormData();
      data.append('email', this.store.get("sign_in.email"));
      data.append('file', this.store.get('sign_in.file'));
      data.append('password', this.store.get("sign_in.password"));
      data.append('username', this.store.get("sign_in.username"));
      data.append('fullname', this.store.get('sign_in.fullname'));
      var result = await fetch('http://localhost:8080/api/user/insert', {
        method: 'POST',
        body: data
      })
        .then(async r => {
          let res = await r.text();
          return res;
        });

      if (result != "Success") {
        showErrorToast(result);
      }
      else {
        toast("You are successfully registered.")
        var returnUrl = this.store.get("$route.returnUrl");
        this.store.delete('sign_in');
        History.pushState({}, null, Url.resolve(returnUrl || "~/"));
      }
    } catch (e) {
      showErrorToast(e);
    }

  }

  cancel() {
    var returnUrl = this.store.get("$route.returnUrl");
    History.pushState({}, null, Url.resolve(returnUrl || "~/"));
  }

  onUploadStarting(xhr, instance, file) {
    console.log(file)
    if (file.type.indexOf("image/") != 0) {
      toast("Only images are allowed.");
      return false;
    }

    if (file.size > 1e6) {
      toast("The file is too large.");
      return false;
    }
    this.store.set("sign_in.pictureUrl", URL.createObjectURL(file));
  }

  onUploadComplete(xhr, instance, file, formData) {
    this.file = file;
    this.store.set('sign_in.file', file);
  }
  onUploadError(e) {
    console.log(e);
  }
}
