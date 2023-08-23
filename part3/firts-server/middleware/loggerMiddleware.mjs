const logger = (req, res, next) => {
  console.log(req.method)
  console.log(req.path)
  console.log(res.body)
  console.log('------')
  next()
}

export default logger
