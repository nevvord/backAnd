const router = express();

router.get('/test', (req, res) => {
  res.send({"json" : "Worked"})
});

module.exports = router;
