export default class View {

  constructor(doc){
    this.doc = doc;
    this.uploadid = "uploadInput";
    this.uploadLinkId = "uploadLink";
    this.uploadButton = `<input id=${this.uploadid} multiple accept=\"image/*\"
                        type=\"file\" style=\"display:none;\" />
  				              <a title="Upload images" href=\"#\" id=${this.uploadLinkId}>
  					            <img id=\"uploadImg\" alt=\"Upload button\"
                        src=\"src/icons/beforeUpload.png\"></img>
  				              </a>`;
    this.closeButtonStr = `<a title="Remove images" href=\"#\" id=\"closeLink\">
  	                       <img id=\"closeIcon\" alt=\"Undo\"
                           src=\"src/icons/closeButton.png\"></img>
                          </a>`;

    this.main = this._query("main");
    this.close = this._createElementWithString("div", "closeButton", "button", this.closeButtonStr);
    this.upload = this._createElementWithString("div", "upload", "button", this.uploadButton);
  }

  init(){
    this.canvas = this._createElement("canvas", "canvas-id", undefined); // recreate, the old one is modified by Caman
    this.append([this.canvas, this.upload], this.main);
    this.uploadInput = this._query(this.uploadid);
    this.uploadLink = this._query(this.uploadLinkId);
  }

  append(elements, where){
    for (let el of elements) {
      where.appendChild(el);
    }
  }
  
  prepend(elements, where, before){
    for (let el of elements) {
      where.insertBefore(el, before);
    }
  }

  remove(elements, where){
    for (let el of elements) {
      where.removeChild(el);
    }
  }

  renderImages(loc, urls){
    this.remove([this.upload], this.main);
    this.append([this.close], this.main);
    // Use Caman to resize, load, overlay and blend the images
    Caman(loc, urls[0], function(){
      this.resize({
          width:"500",
          height: "500"
      });
      this.newLayer(function(){
        this.setBlendingMode('normal');
        this.opacity(50);
        this.overlayImage(urls[1]);
      });
      this.render();
    });

  }

  reset(){
    this.remove([this._query('canvas-id'), this.close], this.main);
    this.init()
  }

  bind(target, type, callback, capture){
    target.addEventListener(type, callback, capture);
  }

  _createElement(type, id, className){
    let el = this.doc.createElement(type);
    el.id = id;
    if (className){
      el.className = className
      }
    return el
  }

  _createElementWithString(type, id, className, str){
    let el = this._createElement(type, id, className);
    el.innerHTML = str;
    return el
  }

  _query(id){
    return this.doc.getElementById(id)
  }
};
