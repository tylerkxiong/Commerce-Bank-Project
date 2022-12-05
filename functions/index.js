const stripe = require('stripe')('sk_test_51M1JAjGuzfMVvAoEWDa1QGqMNWowMZr8WRoMHaqQgvUAWQPiulxHcywZMHG9iwktDNGneDFR0cwaNNQ5fJxO4pbi00LgrOqcrd')

const functions = require("firebase-functions");
const { getFirestore }  = require( 'firebase-admin/firestore');

const admin = require('firebase-admin/app');
//const { async } = require('rxjs');
admin.initializeApp(functions.config().firebase);

var db = getFirestore();
db.settings({ ignoreUndefinedProperties: true })
exports.stripeCheckout = functions.https.onCall(async (data, context) => {
    var productId = data['id'];
    console.log('product id = ' + productId);

    var amountRaised = -1;
    var title = '';
    var imageURL = '';
    var description = '';
    

    var querySnapshot =  await db.collection('Campaigns').where('id', '==', productId).get();
    if( querySnapshot.docs.length > 0)
    {
        var doc = querySnapshot.docs[0];
        title = doc.data().title;
        imageURL = doc.data().imageURL;
        description = doc.data().description;
        amountRaised = doc.data().amountRaised;
    }
    else {
        console.log('Error: document with product id ' + productId + ' not found');
        return null;
    }
    
    const session = await stripe.checkout.sessions.create({
        
        
        payment_method_types: ['card'],   
        line_items: [
            {
                price: 'price_1M1kLCGuzfMVvAoE74KKCeJ2', 
                quantity: 1,
                
            }
        ],
        mode: 'payment',
    
        success_url: 'http://localhost:4200/projects?action=success',
        cancel_url: 'http://localhost:4200/projects?action=cancel',
    })
    
    console.log(session.id);
    
    return session.id;
});



exports.stripeWebhook = functions.https.onRequest(async(req, res) => {
  const stripe = require("stripe")(functions.config().stripe.token);
  
    let signature = req.headers["stripe-signature"];

    let event;

    try {
      const whSecret = functions.config().stripe.webhook_secret;
      event = await stripe.webhooks.constructEvent(req.rawBody,signature,whSecret);

    } catch (err) {
      console.error("⚠️ Webhook signature verification failed.");
      return res.sendStatus(400);
    }
  
     const Obj = event.data.object;
      await db.collection('orders').doc(event.id).set({
      checkoutSessionId: Obj.id,
      paymentStatus: Obj.payment_status,
      amountTotal: Obj.amount_total,

    })
    return res.sendStatus(200);
  });

  
  
  exports.amountUpdate = functions.firestore.document('/orders/{id}').onCreate( (snap, context) =>{
    
    const newVal = snap.data();
    const newAmount = newVal.amountTotal;
    
  
    const docRef = db.collection('Campaigns').doc('Ix34yzbuXXzRMeXtD8NX');

    try {
       db.runTransaction(async (t) => {
        const doc = await t.get(docRef);
        
        
        
        const newRaisedAmount = doc.amountRaised + newAmount;
        t.update(docRef, {amountRaised: newRaisedAmount});
      });
    
      console.log('Transaction success!');
    } catch (e) {
      console.log('Transaction failure:', e);
    }
  });