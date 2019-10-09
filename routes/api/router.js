const router = express()

router.get('/test', (req, res) => {
  
  res
  /*
  .cookie('lol', 'kek', {
    httpOnly: true,
    maxAge: 1000 * 15 
  })*/
  .send({"json" : "Worked"})
  console.log(req.cookies)
  })

module.exports = router
