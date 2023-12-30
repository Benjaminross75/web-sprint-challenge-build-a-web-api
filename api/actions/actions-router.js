// Write your "actions" router here!
const express = require('express');
const {validateActionId, validateAction} = require('./actions-middlware')
const Actions = require('./actions-model');

const actionsRouter = express.Router();

actionsRouter.get('/', (req,res, next)=>{
 Actions.get(req.params.id)
 .then( action =>{
    res.json(action)
 })
 .catch(err =>{
   next(err)
 })
});

actionsRouter.get('/:id', validateActionId, (req,res,next)=>{
    Actions.get(req.params.id)
    .then(action =>{
        res.json(action)
    })
    .catch(err =>{
        next(err)
    })
});

actionsRouter.post('/',  validateAction, (req, res, next)=>{
  Actions.insert(req.body)
  .then(action =>{
    res.json(action)
  })
  .catch(err =>{
    next(err)
  })
});

// actionsRouter.put('/:id', async (req, res, next)=>{
//  try{
//     const {id} = req.params;
//     const changes = {
//         notes: req.body.notes,
//         description: req.body.description,
//         project_id: req.body.project_id,
//         completed: !completed,
//      }
//      if(!req.body.notes || !req.body.description || !req.body.project_id || !req.body.completed){
//         res.status(400).json({message: "you need these"})
//      }
//  }
//   catch(err){
//     console.error('this is an errrrror')
//   }
// })

actionsRouter.put('/:id', async (req, res, next)=>{
    try{
       const {id} = req.params;
       const changes = {
           notes: req.body.notes,
           description: req.body.description,
           project_id: req.body.project_id,
           completed: req.body.completed,


       }

       if(!req.body.notes || !req.body.description || !req.body.project_id || req.body.completed === undefined){
           res.status(400).json()
       }
       const updatedAction = await Actions.update(id, changes);
        if(!updatedAction){
           res.status(404).json("error")
        } else{
          res.json(updatedAction)
        }



   } catch(err){
       next(err)
   }

   })
actionsRouter.delete('/:id', validateActionId, (req, res, next)=>{
  Actions.remove(req.params.id)
  .then(action =>{
    res.json(action)
  })
  .catch(err =>{
    next(err)
  })
})

actionsRouter.use((err, req, res, next) =>{ //eslint-disable-line
    res.status(err.status || 500).json({
      customMessage: "Something tagic inside posts router happened",
      message: err.message,

    })
  });
module.exports = actionsRouter
