/**
 * Express.js error handling with async code is not explicit
 * refer to https://expressjs.com/en/guide/error-handling.html
 */
const app = require('express')();
const { promisify } = require('util');
const fs = require('fs');
const readFilePromise = promisify(fs.readFile);

//wrong, not caught by error handler
app.get('/error1', async (req, res) => {
  await readFilePromise('empty-path');
});

//wrong, not caught by error handler
app.get('/error2', async (req, res, next) => {
  try {
    await readFilePromise('empty-path');
  } catch (err) {
    throw new Error(err);
  }
});

//wrong, not caught by error handler
app.get('/error3', async (req, res, next) => {
  //sthing sync but in async function
  throw new Error('sync error');
});

//correct, for async request handler
app.get('/error4', async (req, res, next) => {
  try {
    await readFilePromise('empty-path');
  } catch (err) {
    return next(err);
  }
});

//correct, for sync request handler with async promise code
app.get('/error5', (req, res, next) => {
  readFilePromise('empty-path')
    .then(() => {})
    .catch(next);
});

//correct, for sync request handler sync code
app.get('/error6', (req, res, next) => {
  throw new Error('sync error in sync func');
});

app.use('*', (err, req, res, next) => {
  return res.send('server caught error');
});

app.listen(3001, () => {
  console.log('listening to 3001');
});
