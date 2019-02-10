import { Controller, History, Url } from "cx/ui";
import { toast, showErrorToast } from "../../../components/toasts";
import { POST } from "../../../api/methods";

export default class extends Controller {

  async signIn() {
    try {
      var data = new FormData();
      if(file)
      var fileParsed=JSON.stringify(file).replace(/^"(.+(?="$))"$/, '$1');
      let formData = this.store.get('sign_in');
      let { email, file, password, username, fullname } = formData;
      data.append('email', email);
      data.append('file', fileParsed );
      data.append('password', password);
      data.append('username', username);
      data.append('fullname', fullname);

      var result = POST('user/insert',data);
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

  onUploadComplete(xhr, instance, file) {
    var reader = new FileReader();p
    let store = this.store;
    store.set('fileLoading', true);
    reader.onload = function (event) {
      var img = new Image();
      img.onload = function (evm) {
        store.set('sign_in.file', event.target.result.split("base64,")[1]);
        store.set('fileLoading', false);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  onUploadError(e) {
    console.log(e);
  }
}
