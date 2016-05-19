export default class Model {
  constructor(doc){
    this.imageType = /^image\//;
    this.fileURLs = [];

  }
  handleSelectedFiles(files){
    if(!this.imageType.test(files[0].type)){
      return
    }
    for (let file of files){
      this.fileURLs.push(window.URL.createObjectURL(file));
      }
    }

  numberOfImages(){
    return this.fileURLs.length
  }

  getFileURLs(){
    if (this.fileURLs.length === 2){
      return this.fileURLs
    }
    else {
      return null
    }
  }
  reset(){
    this.fileURLs = [];
  }
}
