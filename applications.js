const express = require('express');

const router = express.Router();

const { fetchData } = require('./db');

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

/* todo útfæra */
function app(req, res) {
  res.render('applications', {
    title: 'Umsóknir',
  });
}

async function getApplications(req, res) {
  const rows = await fetchData();

  console.log(rows[0]);

  // const body = rows.map(row => `${row.name};${row.email};${row.simi};${row.texti};${row.starf}`).join('\n');

  res.render('applications', {
    title: 'Umsóknir',
    rows,
  });
}

router.get('/', catchErrors(app));
router.get('/applications', catchErrors(getApplications));


module.exports = router;
