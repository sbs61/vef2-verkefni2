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
function app(req, res) {
  res.render('applications', {
    title: 'Umsóknir',
  });
}

// aðferð sem tekur inn id á umsókn og eyðir henni úr gagnagrunninum
async function deleteApplication(id) {
  await deleteData(id);
}

// aðferð sem tekur inn id á umsókn og uppfærir stöðu hennar í "unnin"
async function updateApplication(id) {
  await updateData(id);
}

// sæki allar umsóknirnar og rendera applications síðuna
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
