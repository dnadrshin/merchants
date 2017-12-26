const
  router = require('express').Router(),
  merchants = require('../fixtures/merchants');

router.get('/merchants', (req, res) => {
  res.set('X-Pagination-Count', merchants.length);
  if(req.query.start && req.query.limit) return res.json(merchants.slice(
    Number(req.query.start) - 1,
    Number(req.query.start) + Number(req.query.limit) - 1)
  );

  if(!req.query.start && !req.query.limit) return res.json(merchants);
  if(req.query.limit) return res.json(merchants.slice(0, req.query.limit));
  return res.json(merchants);
})

router.post('/merchant', (req, res) => {
  return res.json(req.body);
})

router.put('/merchant', (req, res) => {
  return res.json(req.body);
})

router.get('/merchants/:id/bids', (req, res) => {
  return res.json({data: 1});
})

module.exports = router;
