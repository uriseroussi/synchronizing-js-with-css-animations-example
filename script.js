// CONFIG
const COUNT_TO = 100;

// ELEMENTS
let progressBarElement = document.querySelector('.progress-bar');
const progressNumberElement = document.querySelector('.progress-number');
const buttonElement = document.querySelector('.button');

// FUNCTIONS
const renderCurrentCounterValue = () => {
  // get the current computed styles on the progress bar
  const progressBarComputedStyle = window.getComputedStyle(progressBarElement);

  // returns a string with the values: 'matrix(scaleX(), skewY(), skewX(), scaleY(), translateX(), translateY())'
  const progressBarTransformStyle = progressBarComputedStyle.transform;
  const progressBarScaleX = progressBarTransformStyle
    .replace('matrix(', '')
    .replace(')', '')
    .split(',')[0];

  // calculate the current number
  const currentNumber = Math.round(progressBarScaleX * COUNT_TO);

  // update element content
  progressNumberElement.innerHTML = `+${currentNumber}`;

  // no need to continue looping when number is reached
  if (currentNumber === COUNT_TO) return;

  requestAnimationFrame(renderCurrentCounterValue);
};

requestAnimationFrame(renderCurrentCounterValue);

// RESTART ANIMATION
const reset = () => {
  const progressBarElementClone = progressBarElement.cloneNode(true);
  progressBarElement.parentNode.replaceChild(
    progressBarElementClone,
    progressBarElement
  );
  progressBarElement = progressBarElementClone;
  progressNumberElement.innerHTML = '+0';

  requestAnimationFrame(renderCurrentCounterValue);
};

buttonElement.addEventListener('click', reset);
