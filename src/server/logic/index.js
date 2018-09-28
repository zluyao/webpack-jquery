module.exports = function (router) {
  router.post('/log', (req, res) => {
    res.status(201).end();
  });
}
