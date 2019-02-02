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
  } else {
    eye.pupil.x = eye.x + (maxDistance/n)*diffX;
    eye.pupil.y = eye.y + (maxDistance/n)*diffY;
  }

  // polar coordinates
  // html canvas is positive y in the down direction, so need to adjust accordingly
  var theta = Math.atan2(1,0)

  if (n > 0)
    theta = Math.atan2(diffY,diffX)
  
  if (theta < 0)
    theta = 2*Math.PI+theta

  //alert("diffX="+diffX+"\ndiffY="+diffY+"\ntheta="+theta);
  //alert("evt.clientX="+evt.clientX+", evt.clientY="+evt.clientY+", theta="+theta);
  
  if (theta >= (15*Math.PI/8) || theta <= (Math.PI/8)) {
    if (eye.position === 'right' && eye.medialRectus === null) {
      eye.pupil.x = eye.x
      eye.pupil.y = eye.y
    }
    if (eye.position === 'left' && eye.lateralRectus === null) {
      eye.pupil.x = eye.x
      eye.pupil.y = eye.y
    }
  }
  if (theta >= (13*Math.PI/8) && theta < (15*Math.PI/8)) {
    if (eye.position === 'right' && eye.inferiorOblique === null) {
      eye.pupil.x = eye.x
      eye.pupil.y = eye.y
    }
    if (eye.position === 'left' && eye.superiorRectus === null) {
      eye.pupil.x = eye.x
      eye.pupil.y = eye.y
    }
  }
  if (theta >= (11*Math.PI/8) && theta < (13*Math.PI/8)) {
    if (eye.superiorRectus === null && eye.inferiorOblique === null) {
      eye.pupil.x = eye.x
      eye.pupil.y = eye.y
    }
  }
  if (theta > (9*Math.PI/8) && theta < (11*Math.PI/8)) {
    if (eye.position === 'right' && eye.superiorRectus === null) {
      eye.pupil.x = eye.x
      eye.pupil.y = eye.y
    }
    if (eye.position === 'left' && eye.inferiorOblique === null) {
      eye.pupil.x = eye.x
      eye.pupil.y = eye.y
    }
  }
  if (theta >= (7*Math.PI/8) && theta <= (9*Math.PI/8)) {
    if (eye.position === 'right' && eye.lateralRectus === null) {
      eye.pupil.x = eye.x
      eye.pupil.y = eye.y
    }
    if (eye.position === 'left' && eye.medialRectus === null) {
      eye.pupil.x = eye.x
      eye.pupil.y = eye.y
    }
  }
  if (theta >= (5*Math.PI/8) && theta < (7*Math.PI/8)) {
    if (eye.position === 'right' && eye.inferiorRectus === null) {
      eye.pupil.x = eye.x
      eye.pupil.y = eye.y
    }
    if (eye.position === 'left' && eye.superiorOblique === null) {
      eye.pupil.x = eye.x
      eye.pupil.y = eye.y
    }
  }
  if (theta >= (3*Math.PI/8) && theta < (5*Math.PI/8)) {
    if (eye.superiorOblique === null && eye.inferiorRectus === null) {
      eye.pupil.x = eye.x
      eye.pupil.y = eye.y
    }
  }
  if (theta > (Math.PI/8) && theta < (3*Math.PI/8)) {
    if (eye.position === 'right' && eye.superiorOblique === null) {
      eye.pupil.x = eye.x
      eye.pupil.y = eye.y
    }
    if (eye.position === 'left' && eye.inferiorRectus === null) {
      eye.pupil.x = eye.x
      eye.pupil.y = eye.y
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
