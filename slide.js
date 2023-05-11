export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.distance = {finalPosition : 0, startX : 0, totalMovement : 0, movePosition: 0}
  }

  moveSlide(distanceX) {
    this.distance.movePosition = distanceX;
    this.slide.style.transform = `translate3d(${distanceX}px, 0, 0)`;
  }

  updatePosition(clientX) {
    this.distance.totalMovement = (this.distance.startX - clientX) * 1.6;
    //console.log('Total movido : ' + this.distance.totalMovement);
    return this.distance.finalPosition - this.distance.totalMovement;
  }

  onStart(event) {
    let movetype;
    if (event.type === 'mousedown') {
      event.preventDefault();
      this.distance.startX = event.clientX;
      movetype = 'mousemove';
    } else {
      this.distance.startX = event.changedTouches[0].clientX;
      movetype = 'touchmove';
    }
    //console.log('mousedown', 'posição inicial : ' + this.distance.startX);
    this.wrapper.addEventListener(movetype, this.onMove);
  }

  onMove(event) {
    const pointerPosition = event.type === 'mousemove' ? event.clientX : event.changedTouches[0].clientX;
    const finalPosition = this.updatePosition(pointerPosition);
    //console.log('moveu', 'posição final : ' + finalPosition);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    const movetype = event.type === 'mouseup' ? 'mousemove' : 'touchmove';
    //console.log('acabou');
    this.wrapper.removeEventListener(movetype, this.onMove)
    this.distance.finalPosition = this.distance.movePosition;
  }

  addSlideEvents(){
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('touchstart', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd);
    this.wrapper.addEventListener('touchend', this.onEnd);
  }

  bindEvents(){
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  // Slides config
  slidePosition(slide) {
    const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
    console.log(margin)
    return -(slide.offsetLeft - margin);
  }

  slidesConfig() {
    this.slideArray = [...this.slide.children].map((element) => {
      const position = this.slidePosition(element);
      return {position, element}
    })
    console.log(this.slideArray);
  }

  slideIndexNav(index) {
    const last = this.slideArray.length - 1;
    this.index = {
      prev : index ? index - 1 : undefined,
      active : index,
      next : index === last ? undefined : index + 1,
    }
  }

  changeSlide(index) {
    const activeSlide = this.slideArray[index];
    this.moveSlide(activeSlide.position)
    this.slideIndexNav(index);
    this.distance.finalPosition = activeSlide.position;
  }

  init(){
    this.bindEvents();
    this.addSlideEvents();
    this.slidesConfig();
    return this;
  }

}