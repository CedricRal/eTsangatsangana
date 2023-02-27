const stripe = require("stripe")('sk_test_51MRsNRD1CBZDrWS4alDXdEpBg8EyENFuD9aE1b4P5StnGUr7E0HXW7gNW8h97Wr6RJqFAuFSkQ2v0hvFmaEcASmb00Nh4wya6Z')

module.exports={
    CreatePayement:(parent,args,context)=>{
      try{
        if (context.token==false){
          return new GraphQLError('token invalid',{
              extensions:{
                  code:"token invalide"
              }
        })
        }
        else{
          return new Promise((resolve,reject)=>{
            stripe.paymentIntents.create({
              amount: args.prix,
              currency: "mga",
              automatic_payment_methods: {
                enabled: true,
              }
            },function(err,result){
              if(err){
                reject(err)
              }
              else{
                const res = result.client_secret
                resolve({client_secret: res})
              }
            }
          )
        })
        }
    }
    catch(err){
      console.log(err)
    }
        
    }
}