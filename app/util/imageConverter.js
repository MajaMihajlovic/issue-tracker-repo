export async function getBase64(file) {
    return new Promise((resolve, reject) => {
        let fr = new FileReader();

        fr.onload = function(event) {
            console.log(event.target.result); // contains the data
        };
        
        fr.readAsArrayBuffer(file);
        let data = new Int8Array(event.target.result);
    });
  }