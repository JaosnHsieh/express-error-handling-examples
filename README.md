### Express.js error handling example.

I'm confused by catch error with async code in Express request handler quite often.

## Start

`yarn`

`node app.js`

## Wrong(not caught by error handler) endpoints

`GET /error1`

`GET /error2`

`GET /error3`

## Correct(caught by error handler) endpoints

`GET /error4`

`GET /error5`

`GET /error6`

## reference

https://expressjs.com/en/guide/error-handling.html
