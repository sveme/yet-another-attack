export default class Controller {
  constructor(doc, view,  model) {
    this.doc = doc;
    this.view = view;
    this.model = model;
    this.view.init();

    this.uploadCapture = this.uploadCapture.bind(this);
    this.upload = this.upload.bind(this);
    this.close = this.close.bind(this);

    this.view.bind(this.view.uploadLink, "click", this.uploadCapture, false);
    this.view.bind(this.view.uploadInput, "change", this.upload, false);
    this.view.bind(this.view.close, "click", this.close, false);
  }
  uploadCapture(e) {
    this.view.uploadInput.click();
    e.preventDefault();
  }
  
  upload(e) {
    let files = e.target.files;
    this.model.handleSelectedFiles(files);
    if (this.model.numberOfImages() === 2){
      this.view.renderImages(this.view.canvas, this.model.getFileURLs());
    }
    /* handle file upload asynchronously
    once done in model, call callback chain
    in controller
    which initiates rendering in the view
    */
    e.preventDefault();

  }
  
  close(e) {
    this.model.reset() 
    this.view.reset();
    //this.view.toggle('readyForUpload');
  }
}
