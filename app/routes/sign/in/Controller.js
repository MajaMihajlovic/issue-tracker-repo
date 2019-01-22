import { Controller, History, Url } from "cx/ui";
import { POST } from "../../../api/methods";

export default class extends Controller {
  async signIn() {
    debugger
    var user = {
      username: this.store.get("sign_in.username"),
      full_name: this.store.get("sign_in.fullname"),

      email: this.store.get("sign_in.email"),
      photo: this.store.get("sign_in.pictureUrl")
    };
    console.log(user);
    sessionStorage.setItem("user", user);
    var returnUrl = this.store.get("$route.returnUrl");
    console.log(returnUrl);

    let response = await POST("user/registration/", user, null);
    //  History.pushState({}, null, Url.resolve(returnUrl || "~/"));
  }

  cancel() {
    var returnUrl = this.store.get("$route.returnUrl");
    History.pushState({}, null, Url.resolve("~/"));
  }

  onUploadStarting(xhr, instance, file) {
    if (file.type.indexOf("image/") != 0) {
      MsgBox.alert("Only images are allowed.");
      return false;
    }

    if (file.size > 1e6) {
      MsgBox.alert("The file is too large.");
      return false;
    }
    this.store.set("sign_in.pictureUrl", URL.createObjectURL(file));
  }

  onUploadComplete(xhr, instance) { }

  onUploadError(e) {
    console.log(e);
  }
}
