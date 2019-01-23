import { Controller, History, Url } from "cx/ui";
import { POST } from "../../../api/methods";
import { toast, showErrorToast } from "../../../components/toasts";

export default class extends Controller {

  
  async signIn() {
  
    var user = {
      password: this.store.get("sign_in.password"),
      username: this.store.get("sign_in.username"),
      fullName: this.store.get("sign_in.fullname"),
      email: this.store.get("sign_in.email"),
      //photo: this.file
    };

    console.log(user);
    sessionStorage.setItem("user", user);
    try{
    var result=await POST("user/registration/", user, null);
    console.log(result)
    if(result!="Success"){
      showErrorToast(result);}
      else{
        var returnUrl = this.store.get("$route.returnUrl");
    this.store.delete('sign_in');
    History.pushState({}, null, Url.resolve(returnUrl || "~/"));
      }
    }catch (e) {
      showErrorToast(e);
    }
    
  }

  cancel() {
    var returnUrl = this.store.get("$route.returnUrl");
    History.pushState({}, null, Url.resolve(returnUrl || "~/"));
  }

  onUploadStarting(xhr, instance, file) {
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

onUploadComplete(xhr,instance,file,formData){
  console.log("majaa");console.log(formData);
}



  onUploadError(e) {
    console.log(e);
  }
}
