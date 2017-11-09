'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultOptions = {
  //  skipModels: [] TODO: Skip these models in analytics.

  // Default authorization middleware. Just allows the call to go through.
  auth: function auth(req, res, next) {
    return next();
  }

};

var Analytics = function () {
  function Analytics(options) {
    var _this = this;

    _classCallCheck(this, Analytics);

    this.getBasicStats = function (req, res) {

      return _this.adapter.getBasicStats().then(function (results) {
        return res.json(results);
      }).catch(function (err) {
        return res.status(500).json(err);
      });
    };

    this.queryModel = function (req, res) {
      var modelName = req.params.model;

      return _this.adapter.query(modelName, req.body).then(function (results) {
        return res.json(results);
      }).catch(function (err) {
        return res.status(500).json(err);
      });
    };

    this.countModel = function (req, res) {
      var modelName = req.params.model;

      return _this.adapter.count(modelName, req.body).then(function (results) {
        return res.json(results);
      }).catch(function (err) {
        return res.status(500).json(err);
      });
    };

    // Merge defaultOptions and options.
    this.options = Object.assign({}, defaultOptions, options);
    this.router = new _express2.default.Router();

    this.router.get('/', this.options.auth, this.getBasicStats);
    this.router.post('/query/:model', this.options.auth, this.queryModel);
    this.router.post('/count/:model', this.options.auth, this.countModel);
  }

  _createClass(Analytics, [{
    key: 'setAdapter',
    value: function setAdapter(adapter) {
      this.adapter = adapter;
    }
  }]);

  return Analytics;
}();

exports.default = Analytics;