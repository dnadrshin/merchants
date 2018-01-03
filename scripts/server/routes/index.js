const
  router = require('express').Router(),
  merchants = require('../fixtures/merchants'),
  bids = require('../fixtures/bids'),

  // Immitating fetch waiting
  wainting = (req, res, next) => {
    setTimeout(next, 700);
  };

router.get('/merchants', wainting, (req, res) => {
  res.set('X-Pagination-Count', merchants.length);
  if(req.query.start && req.query.limit) {
    return res.json(merchants
      .slice(Number(req.query.start) - 1, (Number(req.query.start) + Number(req.query.limit) - 1)));
  }

  if(!req.query.start && !req.query.limit) return res.json(merchants);
  if(req.query.limit) return res.json(merchants.slice(0, req.query.limit));
  return res.json(merchants);
});

router.post('/merchant', wainting, (req, res) => res.json(req.body));
router.delete('/merchant', wainting, (req, res) => res.json(req.query));
router.put('/merchant', wainting, (req, res) => res.json(req.body));
router.get('/merchants/:id/bids', wainting, (req, res) => res.json(bids));

module.exports = router;
