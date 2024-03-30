let highestZ = 1;

class Paper {
  holdingPaper = false;
  startX = 0;
  startY = 0;
  moveX = 0;
  moveY = 0;
  prevX = 0;
  prevY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentX = 0;
  currentY = 0;
  rotating = false;

  init(paper) {
    const isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints;

    const startEvent = isTouchDevice ? 'touchstart' : 'mousedown';
    const moveEvent = isTouchDevice ? 'touchmove' : 'mousemove';
    const endEvent = isTouchDevice ? 'touchend' : 'mouseup';

    paper.addEventListener(moveEvent, (e) => {
      e.preventDefault();
      if (!this.rotating && this.holdingPaper) {
        if (isTouchDevice) {
          this.moveX = e.touches[0].clientX;
          this.moveY = e.touches[0].clientY;

          this.velX = this.moveX - this.prevX;
          this.velY = this.moveY - this.prevY;

          this.currentX += this.velX;
          this.currentY += this.velY;

          this.prevX = this.moveX;
          this.prevY = this.moveY;
        } else {
          this.moveX = e.clientX;
          this.moveY = e.clientY;

          this.velX = this.moveX - this.prevX;
          this.velY = this.moveY - this.prevY;

          this.currentX += this.velX;
          this.currentY += this.velY;

          this.prevX = this.moveX;
          this.prevY = this.moveY;
        }

        paper.style.transform = `translateX(${this.currentX}px) translateY(${this.currentY}px) rotateZ(${this.rotation}deg)`;
      }
    });

    paper.addEventListener(startEvent, (e) => {
      this.holdingPaper = true;

      if (isTouchDevice) {
        this.startX = e.touches[0].clientX;
        this.startY = e.touches[0].clientY;
        this.prevX = this.startX;
        this.prevY = this.startY;
      } else {
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.prevX = this.startX;
        this.prevY = this.startY;

        if (e.button === 2) {
          this.rotating = true;
        }
      }

      paper.style.zIndex = highestZ;
      highestZ += 1;
    });

    window.addEventListener(endEvent, () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
