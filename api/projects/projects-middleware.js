// add middlewares here related to projects
const Projects = require('./projects-model')

async function validateProjectId(req, res, next){
    try{
     const project = await Projects.get(req.params.id);
     if(!project){
        res.status(404).json({
            message: "No project exists"
        })
     } else{
       req.project = project
       res.json(project)
        next()
     }


    }
    catch(err){
    res.status(500).json({
        message: "Problem finding project"
    })
    }
}


function validateProject(req, res, next){
    const {name, description, completed} = req.body;
    if(!name || !description || !completed){
        res.status(400).json({
            message: "Name and Description are Mandatory"
        })
    } else{
        res.locals.validateData = {
            name:name,
            description: description,
            completed: completed
        };
        next()
    }
}
module.exports = {
    validateProjectId,
    validateProject,
}
