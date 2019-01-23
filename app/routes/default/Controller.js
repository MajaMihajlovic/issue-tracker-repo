import { Controller, History, Url } from "cx/ui";
import { login } from "../../api/methods";
import { showErrorToast } from "../../components/toasts"
export default class extends Controller {
  
  signIn() {;
    var returnUrl = this.store.get("$route.returnUrl");
    History.pushState({}, null, Url.resolve(returnUrl || "~/sign/in"));
  }

  async login() {
    console.log(this.store.get("login.username"))
    var userInfo = {
      username: this.store.get("login.username"),
      password: this.store.get("login.password")
    };
    console.log(userInfo);
    try {
      await login(userInfo, this.store);
      this.store.delete('login');
    }
    catch (e) {
      showErrorToast(e);
      this.store.set("login.loading", false);
    }
  }
}
