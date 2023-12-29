// add middlewares here related to actions
const Actions = require('./actions-model')

async function validateActionId(req, res, next){
    try{
     const action = await Actions.get(req.params.id);
     if(!action){
        res.status(404).json({
            message: "No action exists"
        })
     } else{
       req.action = action
       res.json(action)
        next()
     }


    }
    catch(err){
    res.status(500).json({
        message: "Problem finding action"
    })
    }
}


function validateAction(req, res, next){
    const {project_id, description, notes} = req.body;
    if(!project_id || !description || !notes){
        res.status(400).json({
            message: "Project ID, description, and note fields are mandatory"
        })
    } else{
        res.locals.validateData = {
            project_id: project_id,
            description: description,
            notes: notes,

        };
        next()
    }
}
module.exports = {
    validateActionId,
    validateAction,
}
