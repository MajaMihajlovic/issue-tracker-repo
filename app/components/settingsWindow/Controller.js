import { Controller } from "cx/ui";

export default class extends Controller {

    onInit() {
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
        this.store.set("user.photo", URL.createObjectURL(file));
    }

    onUploadComplete(xhr, instance, file) {
        var reader = new FileReader();
        let store = this.store;
        store.set('fileLoading', true);
        reader.onload = function (event) {
            var img = new Image();
            img.onload = function (evm) {
                store.set('user.photo', event.target.result.split("base64,")[1]);
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
