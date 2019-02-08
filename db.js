const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL; // sótt úr env gegnum dotenv pakka

/* todo útfæra */

async function insert(data) {
  const client = new Client({ connectionString });

  await client.connect();
  try {
    const query = 'INSERT INTO applications (name, email, simi, texti, starf) VALUES ($1, $2, $3, $4, $5)';
    const values = [data.name, data.email, data.phone, data.info, data.job];

    const res = await client.query(query, values);
    // eslint-disable-next-line no-console
    console.log(res.rows);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}

async function fetchData() {
  const client = new Client({ connectionString });

  await client.connect();

  try {
    const result = await client.query('SELECT * FROM applications');

    const { rows } = result;
    return rows;
  } catch (err) {
    console.error('Error selecting form data');
    throw err;
  } finally {
    await client.end();
  }
}

async function deleteData(id) {
  const client = new Client({ connectionString });

  await client.connect();

  try {
    await client.query(`DELETE FROM applications WHERE id=${id}`);
  } catch (err) {
    console.error('Error selecting form data');
    throw err;
  } finally {
    await client.end();
  }
}

module.exports = {
  insert,
  fetchData,
  deleteData,
};
