import { Controller, History, Url } from "cx/ui";
import { login } from "../../api/methods";
import { showErrorToast } from "../../components/toasts"
export default class extends Controller {
  signIn() {
    // this.store.set('user', 'test');
    //sessionStorage.setItem('user', 'test');
    var returnUrl = this.store.get("$route.returnUrl");
    History.pushState({}, null, Url.resolve(returnUrl || "~/sign/in"));
  }

  async login() {
    var userInfo = {
      username: this.store.get("login.username"),
      password: this.store.get("login.password")
    };
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
