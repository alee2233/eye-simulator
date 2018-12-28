const url_string = window.location.href;
const url = new URL(url_string);

const canvas = document.getElementById("myCanvas");
const context = canvas.getContext('2d');

const eyeRadius = canvas.height/8;
const pupilRadius = canvas.height/32;
const clickRadius = 10;

const eye1 = {
  position: 'right',
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

const eye2 = {
  position: 'left',
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
drawEye(context, eye1.x, eye1.y, eye1.pupil.x, eye1.pupil.y)
drawEye(context, eye2.x, eye2.y, eye2.pupil.x, eye2.pupil.y)

canvas.addEventListener('click',function(evt){
  //clear canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  //update coordinates
  updatePupil(evt,eye1);
  updatePupil(evt,eye2);

  //redraw eyes
  drawEye(context, eye1.x, eye1.y, eye1.pupil.x, eye1.pupil.y)
  drawEye(context, eye2.x, eye2.y, eye2.pupil.x, eye2.pupil.y)

  //draw click spot
  drawCircle(context, evt.clientX, evt.clientY, clickRadius, 'red')

},false);

function updatePupil(evt, eye) {
  const diffX = evt.clientX - eye.x;
  const diffY = evt.clientY - eye.y;

  // n is distance from eye center to click point
  const n = Math.sqrt(Math.pow(diffX,2)+Math.pow(diffY,2));
  // max distance the pupil can travel
  const maxDistance = eyeRadius - pupilRadius;

  if (n <= maxDistance) {
    eye.pupil.x = evt.clientX;
    eye.pupil.y = evt.clientY;
  } else if (n == 0) {
    eye.pupil.x = eye.x;
    eye.pupil.y = eye.y;
  } else {
    eye.pupil.x = eye.x + (maxDistance/n)*diffX;
    eye.pupil.y = eye.y + (maxDistance/n)*diffY;
  }

  // edit values based on eye muscle on/off
  if (eye.position === 'right') {
    if (eye.medialRectus === null && eye.pupil.x > eye.x) {
      eye.pupil.x = eye.x;
    }
    if (eye.lateralRectus === null && eye.pupil.x < eye.x) {
      eye.pupil.x = eye.x;
    }
    if (eye.inferiorRectus === null && eye.pupil.y > eye.y) {
      eye.pupil.y = eye.y;
    }
    if (eye.superiorRectus === null && eye.pupil.y < eye.y) {
      eye.pupil.y = eye.y;
    }
  }

  if (eye.position === 'left') {
    if (eye.lateralRectus === null && eye.pupil.x > eye.x) {
      eye.pupil.x = eye.x;
    }
    if (eye.medialRectus === null && eye.pupil.x < eye.x) {
      eye.pupil.x = eye.x;
    }
    if (eye.inferiorRectus === null && eye.pupil.y > eye.y) {
      eye.pupil.y = eye.y;
    }
    if (eye.superiorRectus === null && eye.pupil.y < eye.y) {
      eye.pupil.y = eye.y;
    }
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
