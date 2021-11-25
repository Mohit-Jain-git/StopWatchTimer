class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;

    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);

    if (callbacks) {
      this.OnStart = callbacks.OnStart;
      this.OnTick = callbacks.OnTick;
      this.OnComplete = callbacks.OnComplete;
    }
  }

  start = () => {
    if (this.OnStart) {
      this.OnStart(this.timeRemaining);
    }
    this.tick();
    this.interval = setInterval(this.tick, 20);
  };
  pause = () => {
    clearInterval(this.interval);
  };
  tick = () => {
    if (this.timeRemaining <= 0) {
      this.pause();
      if (this.OnComplete) {
        this.OnComplete();
      }
    } else {
      this.timeRemaining = this.timeRemaining - 0.02;
      if (this.OnTick) {
        this.OnTick(this.timeRemaining);
      }
    }
  };
  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }
  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }
}

const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#Start");
const pauseButton = document.querySelector("#Pause");
const circle = document.querySelector("circle");
const perimeter = circle.getAttribute("r") * 2 * Math.PI;
circle.setAttribute("stroke-dasharray", perimeter);
let duration;

const timer = new Timer(durationInput, startButton, pauseButton, {
  OnStart(totalDuration) {
    duration = totalDuration;
  },
  OnTick(timeRemaining) {
    circle.setAttribute(
      "stroke-dashoffset",
      (perimeter * timeRemaining) / duration - perimeter
    );
  },
  OnComplete() {
    console.log("Timer is completed");
  },
});
