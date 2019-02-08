/* eslint-disable prefer-destructuring */
const express = require('express');

const router = express.Router();

const { fetchData } = require('./db');
const { deleteData } = require('./db');
const { updateData } = require('./db');


function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

function test(id) {
  // eslint-disable-next-line no-console
  console.log(`id nr${id}`);
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

async function updateApplication(id) {
  await updateData(id);
}

async function getApplications(req, res) {
  const rows = await fetchData();

  res.render('applications', {
    title: 'Umsóknir',
    rows,
    test,
    deleteApplication,
    updateApplication,
  });
}


router.get('/', catchErrors(app));
router.get('/applications', catchErrors(getApplications));

module.exports = router;
