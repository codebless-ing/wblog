function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}

function xhrErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}

function errorHandler (err, req, res, next) {
  res.status(500)
  res.send({ error: String(err) })
}

export { logErrors, xhrErrorHandler, errorHandler }
