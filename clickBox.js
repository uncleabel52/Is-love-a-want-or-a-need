
//click box class
class clickBox {
  constructor(x, y, w, h, word) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.word = word;
  }
  setLink(link) {
    this.link = link;
  }
  
  rectan() {
    rect(this.x, this.y, this.w, this.h);
  }
  clickCheck() {
    if (
      mouseX > this.x &&
      mouseX < this.x + this.w &&
      mouseY > this.y &&
      mouseY < this.y + this.h
    )
      return true;
  }
}

