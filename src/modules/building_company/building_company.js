const model = require('./model')


module.exports = {

    GET: async(_, res) => {
        try {
            res.json(await model.company())
        } catch(err) {
            res.sendStatus(500)
        }
    },

    POST: async(req, res) => {
        try {
            const { name } = req.body
            res.json(await model.newCompany(name))
        } catch(err) {
            res.sendStatus(500)
        }
    },

    UPDATE: async(req, res) => {
        try {
            const { name, id } = req.body
            res.json(await model.editCompany(name, id))
        } catch (error) {
            res.sendStatus(500)
        }
    },
    
    DELETE: async(req, res) => {
        try{
            const { id } = req.body
            res.json(await model.delCompany(id))
        }catch(errr){
            res.sendStatus(500)
        }
    }
}