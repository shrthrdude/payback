var Debt = require('../dbModels/Debts.js');
var User = require('../dbModels/User.js');
var mongoose = require('mongoose');

module.exports = {

  createDebt: function(req, res){
    Debt.create({
      email: req.body.email, 
      fullname: req.body.fullname, 
      amount: req.body.amount, 
      cellPhone: req.body.cellPhone,
      newdescription: req.body.newdescription,
      message: req.body.message,
      userId: req.user.id
    },
     function(err, debt){
      if(debt){
        User
          .findByIdAndUpdate(req.user.id, 
            {$push: {debtId: debt._id}},
            function(err, debt){
              if(err) return res.status(500).end(); 
              return res.json(debt); 
            });
      }
      // if(err) return res.status(500).end(); 
      // return res.json(debt); 
    });
  },

  getDebts: function(req, res) {
    Debt.find({}, function(err, result) {
      if(err) {
        return res.status(500).end();
      }
      return res.json(result);
    });
  },
  
  updateDebt: function(req, res) {
    Debt.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
      if (err) return res.status(500).json(err);
      res.json(result);
    });
  }

  // delete: function(req, res) {
  //   Debt.findByIdAndRemove(req.params.id, function(err, result) {
  //     if (err) return res.status(500).json(err);
  //     res.json(result);
  //   });
  // }
};