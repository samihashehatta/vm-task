const firebase = require('firebase')
const database = firebase.database()
const _ = require('lodash')
const home = (req,res)=>{
        const body= _.pick(req.body,['email','password'])
        firebase.auth().createUserWithEmailAndPassword(body.email,body.password)
        .then(result=>{
      
                    firebase.auth().currentUser.getIdToken(false)
                    .then(token=>{
                        return res.send({
                        id:result.user.uid,
                        email:result.user.email,
                        token
                        })
                    })

            
        })
        .catch(err=>res.status(400).send(err))
}

const login = (req,res)=>{
    const body= _.pick(req.body,['email','password'])

    firebase.auth().signInWithEmailAndPassword(body.email,body.password)
    .then(result=>{
        firebase.auth().currentUser.getIdToken(false)
        .then(token=>{
            return res.send({
              id:result.user.uid,
              email:result.user.email,
              token
            })
        })
    })
    .catch(err=>res.send(err))
}
const createJob = (req,res)=>{
    const body= _.pick(req.body,['name','description'])

    database.ref('/jobs/').push({  name: body.name,
    description:body.description,
    createdOn : `${new Date()}`})
    .then(crreated=>{
        return res.send({newJob:body})
    })
    .catch(err=>res.send(err))
}
const getJob = (req,res)=>{
  database.ref('/jobs/').once('value')
  .then(all=>res.send(all))
  .catch(err=>res.send(err))

}
const editJob = (req,res)=>{
    const body= _.pick(req.body,['name','description'])

    database.ref('/jobs/'+req.params.id).set({  name: body.name,
    description:body.description,
    createdOn : `${new Date()}`})
    .then(crreated=>{
        return res.send({newJob:body})
    })
    .catch(err=>res.send(err))
}
const deleteJob = (req,res)=>{

        database.ref('/jobs/-'+req.params.id).remove()
         .then((deleted)=>{
            return res.send("deleted successfully")

         })
    .catch(err=>res.send(err))

}
module.exports= {
    login,
    home,
    getJob,
    createJob,
    editJob,
    deleteJob
}