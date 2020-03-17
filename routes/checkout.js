var express = require('express');
var router = express.Router();
var braintree = require('braintree');

router.post('/', function(req, res, next) {
  var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    // Use your own credentials from the sandbox Control Panel here
    merchantId: 'b9tnmy8r5fhs9byw',
    publicKey: 'jhmfhj5zqtqdjk6m',
    privateKey: 'fc1b8474b075fb11646f3bddcba83987'
  });

  // Use the payment method nonce here
  var nonceFromTheClient = req.body.paymentMethodNonce;
  var amounts= req.body.amount;
  console.log(amounts);
  // Create a new transaction for $10
  var newTransaction = gateway.transaction.sale({

    
    amount: ''+amounts+'',
    paymentMethodNonce: nonceFromTheClient,
    options: {
      // This option requests the funds from the transaction
      // once it has been authorized successfully
      submitForSettlement: true
    }
  }, function(error, result) {
    if (result) {
        //console.log(result.transaction.status);
        console.log(result.transaction.status);
        console.log(result);
            res.send(result);
    }
      
      
        else  {
        res.status(500).send(error);
     //  console.log(error);
      }
  });
});

module.exports = router;



/*var express = require('express');
var router = express.Router();
var braintree = require('braintree');

router.post('/checkout', function(req, res, next) {
  var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    // Use your own credentials from the sandbox Control Panel here
    merchantId: 'b9tnmy8r5fhs9byw',
    publicKey: 'jhmfhj5zqtqdjk6m',
    privateKey: 'fc1b8474b075fb11646f3bddcba83987'
  });

  // Use the payment method nonce here
  var nonceFromTheClient = req.body.paymentMethodNonce;
  // Create a new transaction for $10
  var newTransaction = gateway.transaction.sale({
    amount: '10.00',
    paymentMethodNonce: nonceFromTheClient,
    options: {
      // This option requests the funds from the transaction
      // once it has been authorized successfully
      submitForSettlement: true
    }
  }, function(error, result) {
      if (result) {
        res.send(result);
      } else {
        res.status(500).send(error);
      }
  });
});*/

