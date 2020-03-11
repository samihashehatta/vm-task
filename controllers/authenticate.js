const admin = require("firebase-admin");


const authenticate = (req,res,next) =>{
    let token = req.header('Authorization');
    if(!token) return res.status(401).send('you are unauthorized usear')
    token = token.replace('Bearer', '').trim()
    admin.auth().verifyIdToken(token)
    .then(user =>{
        if(!user)res.status(401).send('you are unauthorized user')
        else{
            
            req.user = user
            req.token = token
            next()
            
        }
    })
    .catch(err => res.status(401).send(err))

}
module.exports=authenticate