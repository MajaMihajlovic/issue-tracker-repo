import { Controller, History, Url } from "cx/ui";
import { POST, enterApp } from "../../api/methods";

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
    //sessionStorage.setItem("userInfo", userInfo);
    console.log(userInfo);
    let response = await POST("user/login", userInfo, null);
    // await enterApp(userInfo);
    console.log("response:" + JSON.stringify(response));
    //var returnUrl = this.store.get("$route.returnUrl");
    //History.pushState({}, null, Url.resolve(returnUrl || "~/"));
  }
}
