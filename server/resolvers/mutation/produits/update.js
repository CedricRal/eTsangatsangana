const client = require('../../../services/connection')

module.exports = {
    updateProduit:(parent,args) =>{
        try{
            return new Promise((resolve,reject)=>{
                client.query('UPDATE "Produits" SET ("titre", "resume", "qt", "prix", "livraison", "place_dispo", "id_etp") = ($1,$2,$3,$4,$5,$6,$7) WHERE (id=$8) RETURNING *',[args.titre, args.resume, args.qt, args.prix, args.livraison, args.place_dispo, args.id_etp,args.id],function(err,result){
                    if(err){
                        reject(new Error(err))
                    }
                    else{
                        console.log(result.rows[0]);
                        resolve(result.rows[0])
                    }
                })
            })
        }
        catch(err){
            console.log(err)
        }
    }
}