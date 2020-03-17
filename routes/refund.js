var express = require('express');
var router = express.Router();
var jsAlert = require('js-alert');
var braintree = require('braintree');


var  gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    // Use your own credentials from the sandbox Control Panel here
    merchantId: 'b9tnmy8r5fhs9byw',
    publicKey: 'jhmfhj5zqtqdjk6m',
    privateKey: 'fc1b8474b075fb11646f3bddcba83987'
  });

/* GET transaction . */
router.get('/', function(req, res, next) {
   
  
 var transact = req.body.refundId;
  console.log(transact);
  gateway.transaction.find(transact, function (err, transaction) {
      console.log(transaction);
      
    res.render('refund',{transactionRefund:transaction.id,amount:transaction.amount,merchant:transaction. merchantAccountId});

  });

});


router.post('/', function(req, res, next) {
    var transact = req.body.refundId;

   
    gateway.transaction.find(transact, function (err, transaction) {
     //  console.log(transaction);
      // test if transaction not found
      if(err)
       {
       
        res.render('notFound',{transaction:transact});
       }
    //  if already refunded
         else if( transaction.refundId!==null)
          {
            var d = new Date(transaction.createdAt);
                //res.send('the id'+transact+' not found');
               // res.send("The transaction id already refunded on " +d + " with the refundId "+transaction.refundId);
                var msg ="The transaction id already refunded on " +d + " / refundId: "+transaction.refundId;
                
                
                res.render('refund',{text:msg , status:'Failed', class:'alert alert-warning'});

          }
          // not refended yet

          else if( transaction.refundId==null){
            
                          
                  gateway.transaction.refund(transact, transaction.amount, function (err, result) {

                   // console.log(result.success==false);
                        if(result.success==false)
                        {
                          //res.send(result.message);
                          res.render('refundError',{message:result.message });
                        }
                        
               
                     else  if(err){
                       res.send(err);
                 
                         }
               
                  
                            else{
                              var msg='The Refund_ID is :'+result.transaction.id+' with the amount of :'+result.transaction.amount;

                              res.render('refund',{text:msg , status:'Success', class:'alert alert-success'});

                             // res.send(' The Refund_ID is :'+result.transaction.id+' with the amount of :'+result.transaction.amount);
                              }
                               });

          }
        

     
    });
 
});

module.exports = router;
