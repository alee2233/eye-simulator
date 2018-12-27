const express = require('express');
const router = express.Router();

//const formController = require('./formController');

router.get('/', function(req, res, next) {
  res.render('form')
});

router.get('/eye', function(req, res, next) {
  /*
  Superior rectus muscle.
  Inferior rectus muscle.
  Lateral rectus muscle.
  Medial rectus muscle.
  Superior oblique muscle.
  Inferior oblique muscle.

  res.render('eyes', {
    lsr: req.query.lsr,
    lir: req.query.lir,
    llr: req.query.llr,
    lmr: req.query.lmr,
    lso: req.query.lso,
    lio: req.query.lio,
    rsr: req.query.rsr,
    rir: req.query.rir,
    rlr: req.query.rlr,
    rmr: req.query.rmr,
    rso: req.query.rso,
    rio: req.query.rio
  });

  */
  const eyeMuscleSelect = {
    leftEye: {
      superiorRectus: req.query.lsr,
      inferiorRectus: req.query.lir,
      lateralRectus: req.query.llr,
      medialRectus: req.query.lmr,
      superiorOblique: req.query.lso,
      inferiorOblique: req.query.lio
    },
    rightEye: {
      superiorRectus: req.query.rsr,
      inferiorRectus: req.query.rir,
      lateralRectus: req.query.rlr,
      medialRectus: req.query.rmr,
      superiorOblique: req.query.rso,
      inferiorOblique: req.query.rio
    }
  }

  //return res.json(eyeMuscleSelect);
  res.render('eyes');
});

module.exports = router;