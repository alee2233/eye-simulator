const url_string = window.location.href;
const url = new URL(url_string);

const canvas = document.getElementById("myCanvas");
const context = canvas.getContext('2d');

const eyeRadius = canvas.height/8;
const pupilRadius = canvas.height/32;
const clickRadius = 10;

const rightEye = {
  x: canvas.width/3,
  y: canvas.height/2,
  pupil: {
    x: canvas.width/3,
    y: canvas.height/2
  },
  superiorRectus: url.searchParams.get("rsr"),
  inferiorRectus: url.searchParams.get("rir"),
  lateralRectus: url.searchParams.get("rlr"),
  medialRectus: url.searchParams.get("rmr"),
  superiorOblique: url.searchParams.get("rso"),
  inferiorOblique: url.searchParams.get("rio")
};

const leftEye = {
  x: canvas.width*2/3,
  y: canvas.height/2,
  pupil: {
    x: canvas.width*2/3,
    y: canvas.height/2
  },
  superiorRectus: url.searchParams.get("lsr"),
  inferiorRectus: url.searchParams.get("lir"),
  lateralRectus: url.searchParams.get("llr"),
  medialRectus: url.searchParams.get("lmr"),
  superiorOblique: url.searchParams.get("lso"),
  inferiorOblique: url.searchParams.get("lio")
};

// initialize left and right eyes
drawEye(context, rightEye.x, rightEye.y, rightEye.pupil.x, rightEye.pupil.y)
drawEye(context, leftEye.x, leftEye.y, leftEye.pupil.x, leftEye.pupil.y)

canvas.addEventListener('click',function(evt){
  //clear canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  //update coordinates
  updatePupil(evt,rightEye);
  updatePupil(evt,leftEye);

  //redraw eyes
  drawEye(context, rightEye.x, rightEye.y, rightEye.pupil.x, rightEye.pupil.y)
  drawEye(context, leftEye.x, leftEye.y, leftEye.pupil.x, leftEye.pupil.y)

  //draw click spot
  drawCircle(context, evt.clientX, evt.clientY, clickRadius, 'red')

},false);

function updatePupil(evt, eye) {
  const diffX = evt.clientX - eye.x;
  const diffY = evt.clientY - eye.y;

  // n is distance from eye center to click point
  const n = Math.sqrt(Math.pow(diffX,2)+Math.pow(diffY,2));

  if (n <= (eyeRadius-pupilRadius)) {
    eye.pupil.x = evt.clientX;
    eye.pupil.y = evt.clientY;
  } else {
    eye.pupil.x = eye.x + ((eyeRadius-pupilRadius)/n)*diffX;
    eye.pupil.y = eye.y + ((eyeRadius-pupilRadius)/n)*diffY;
  }
}

function drawEye(context, eyeX, eyeY, pupilX, pupilY) {
  drawCircle(context, eyeX, eyeY, eyeRadius, 'white');
  drawCircle(context, pupilX, pupilY, pupilRadius, 'black');
}

function drawCircle(context, centerX, centerY, radius, color) {
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  context.fillStyle = color;
  context.fill();
  context.stroke();
}
