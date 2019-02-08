const xss = require('xss');
const express = require('express');
const { check, validationResult } = require('express-validator/check');
const { sanitize } = require('express-validator/filter');

const { insert } = require('./db');

const router = express.Router();

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

const validation = [
  check('name').isLength({ min: 1 }).withMessage('Nafn má ekki vera tómt'),
  check('email').isLength({ min: 1 }).withMessage('Netfang má ekki vera tómt'),
  check('email').isEmail().withMessage('Netfang verður að vera netfang'),
  check('phone').isLength({ min: 7 }).withMessage('Símanúmer verður að vera 7 tölustafir'),
  check('info').isLength({ min: 100 }).withMessage('Kynning verður að vera að minnsta kosti 100 stafir'),
  check('job').custom((value, { req }) => value !== req.body.optradio).withMessage('Velja verður starf'),
];

const sanitazion = [
  sanitize('name').trim().escape(),
  sanitize('email').normalizeEmail(),
  sanitize('phone').blacklist('-').toInt(),
  sanitize('info').trim().escape(),
];

function form(req, res) {
  const data = {};
  res.render('index', {
    data,
    errors: [],
    title: 'Atvinnuumsókn',
  });
}

async function register(req, res) {
  const {
    body: {
      name, email, phone, info, job,
    } = {},
  } = req;

  const data = {
    name: xss(name),
    email: xss(email),
    phone: xss(phone),
    info: xss(info),
    job: xss(job),
  };

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array();
    res.render('index', {
      data,
      errors: errorMessages,
      title: 'Atvinnuumsókn',
    });
  } else {
    try {
      await insert(data);
    } catch (e) {
      console.error('Gat ekki búið til nemenda', name, e);
      throw e;
    }
    res.render('thanks', {
      title: 'Umsókn móttekin',
    });
  }
}

router.get('/', catchErrors(form));
router.post('/register', validation, sanitazion, catchErrors(register));

module.exports = router;
