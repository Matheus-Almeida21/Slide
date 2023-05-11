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
    console.log('Total movido : ' + this.distance.totalMovement);
    return this.distance.finalPosition - this.distance.totalMovement;
  }

  onStart(event) {
    event.preventDefault();
    this.distance.startX = event.clientX;
    console.log('mousedown', 'posição inicial : ' + this.distance.startX);
    this.wrapper.addEventListener('mousemove', this.onMove);
  }

  onMove(event) {
    const finalPosition = this.updatePosition(event.clientX);
    console.log('moveu', 'posição final : ' + finalPosition);
    this.moveSlide(finalPosition);
  }

  onEnd() {
    console.log('acabou');
    this.wrapper.removeEventListener('mousemove', this.onMove)
    this.distance.finalPosition = this.distance.movePosition;
  }

  addSlideEvents(){
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd);
  }

  bindEvents(){
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  init(){
    this.bindEvents();
    this.addSlideEvents();
    return this;
  }

}