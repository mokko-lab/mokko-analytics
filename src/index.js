import express from 'express';

const defaultOptions = {
//  skipModels: [] TODO: Skip these models in analytics.

  // Default authorization middleware. Just allows the call to go through.
  auth: function(req, res, next) {
    return next();
  }

}

class Analytics {

  constructor(options) {

      // Merge defaultOptions and options.
      this.options = Object.assign({}, defaultOptions, options);
      this.router = new express.Router();

      this.router.get('/', this.options.auth, this.getBasicStats);
      this.router.post('/query/:model', this.options.auth, this.queryModel);
      this.router.post('/count/:model', this.options.auth, this.countModel);
  }

  setAdapter(adapter) {
    this.adapter = adapter;
  }

  getBasicStats = (req, res) => {

      return this.adapter.getBasicStats()
      .then(results => {
        return res.json(results);
      })
      .catch(err => {
        return res.status(500).json(err);
      });

  }

  queryModel = (req, res) => {
    const modelName = req.params.model;

    return this.adapter.query(modelName, req.body)
    .then(results => {
      return res.json(results)
    })
    .catch(err => {
      return res.status(500).json(err);
    })

  }

  countModel = (req, res) => {
    const modelName = req.params.model;

    return this.adapter.count(modelName, req.body)
    .then(results => {
      return res.json(results)
    })
    .catch(err => {
      return res.status(500).json(err);
    })

  }

}

export default Analytics;
