const
  router = require('express').Router(),
  merchants = require('../fixtures/merchants');

router.get('/merchants', (req, res) => {
  return res.json(merchants);
})

router.post('/merchants', (req, res) => {
  return res.json({data: 1});
})

router.put('/merchants/:id', (req, res) => {
  return res.json({data: 1});
})

router.get('/merchants/:id/bids', (req, res) => {
  return res.json({data: 1});
})

module.exports = router;
