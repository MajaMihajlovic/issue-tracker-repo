import { Controller, History, Url } from 'cx/ui';




export default class extends Controller {
    init() {
        super.init();
    }

    async save(){
    var project = {
      name: this.store.get("new_project.name"),
      description: this.store.get("new_project.description"),
      photoUrl: this.store.get("new_project.photoUrl"),
    };

    try{
    var result=await POST("project/", project, null);
    console.log(result)
    if(result!="Success"){
      showErrorToast(result);}
      else{
    this.store.delete('new_project');
    toast("Project successfully added.")
      }
    }catch (e) {
      showErrorToast(e);
    }
    }
}