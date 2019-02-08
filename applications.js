const express = require('express');

const router = express.Router();

const { fetchData } = require('./db');

const { deleteData } = require('./db');

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

function test(id) {
  console.log('id nr' + id);
}

/* todo útfæra */
function app(req, res) {
  res.render('applications', {
    title: 'Umsóknir',
  });
}

async function deleteApplication(id) {
  await deleteData(id);
}

async function getApplications(req, res) {
  const rows = await fetchData();

  res.render('applications', {
    title: 'Umsóknir',
    rows,
    test,
    deleteApplication,
  });
}


router.get('/', catchErrors(app));
router.get('/applications', catchErrors(getApplications));
module.exports = router;
