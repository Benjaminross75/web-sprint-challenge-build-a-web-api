// Write your "projects" router here!
const express = require('express');
const {validateProjectId, validateProject} = require('./projects-middleware')
const Projects = require('./projects-model');

const projectsRouter = express.Router();





projectsRouter.get('/',(req,res,next)=>{
    Projects.get(req.params.id)
    .then(project =>{
        res.json(project)
    })
    .catch(next)
})

projectsRouter.get('/:id', validateProjectId, (req,res,next)=>{
    const {id} = req.params.id
     Projects.get(id)
     .then(project =>{

        res.json(project)
     })
     .catch(next)
});

projectsRouter.post('/', validateProject, (req, res, next)=>{

   Projects.insert(req.body)

   .then(newProject =>{
    res.json(newProject)
   })
   .catch(next)
});



// projectsRouter.put('/:id', async (req, res, next)=>{
//  try{
//     const {id} = req.params;
//     const changes = {
//         name: req.body.name,
//         description: req.body.description,
//         completed: !req.completed,


//     }
//     console.log(req.body)
//     if(!req.body.name || !req.body.description || !req.body.completed){
//         res.status(400).json()
//     }
//     const updatedProject = await Projects.update(id, changes);
//      if(!updatedProject || updatedProject === null){
//         res.status(404).json("error")
//      } else{
//        res.json(updatedProject)
//      }



// } catch(err){
//     next(err)
// }

// })
projectsRouter.put('/:id', async (req, res, next)=>{
    try{
       const {id} = req.params;
       const changes = {
           name: req.body.name,
           description: req.body.description,
           completed: req.body.completed,

 }

       if(!req.body.name || !req.body.description || req.body.completed === undefined){
           res.status(400).json()
       }
       const updatedProject = await Projects.update(id, changes);
       console.log(updatedProject)
        if(!updatedProject){

            res.status(404).json("error")
        } else{
          res.json(updatedProject)
        }



   } catch(err){
       next(err)
   }

   })
projectsRouter.delete('/:id',validateProjectId,(req,res,next)=>{
 Projects.remove(req.params.id)
 .then(project =>{
    res.json(project)
 }).catch(err=>{
    next(err)
 })
});


projectsRouter.get('/:id/actions', (req,res) =>{
    Projects.getProjectActions(req.params.id)
    .then(action =>{
        res.json(action)
    })
})

projectsRouter.use((err, req, res, next) =>{ //eslint-disable-line
    res.status(err.status || 500).json({
      customMessage: "Something tagic inside posts router happened",
      message: err.message,

    })
  });

module.exports = projectsRouter
