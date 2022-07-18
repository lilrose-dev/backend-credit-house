const model = require('./model')


module.exports = {

    GET: async(req, res) => {
        try{
            res.json(await model.getComplexes())
        }catch (err){
            res.sendStatus(500)
        }
    },

    GET_comp: async (req, res) => {
        try {
            const { id } = req.params
            res.json(await model.complexes(id))
        }catch(err) {
            res.sendStatus(500)
        }
    },

    POST: async (req, res) => {
        try {
            const { name, companyID } = req.body
            res.json(await model.newComplex(name, companyID))
        } catch (err) {
            res.sendStatus(500)
        }
    },

    UPDATE: async (req, res) => {
        try {
            const { name, id } = req.body
            res.json(await model.editComplex(name, id))
        } catch (err) {
            res.sendStatus(500)
        }
    },

    DELETE: async (req, res) => {
        try{
            const { id } = req.body
            res.json(await model.delComplex(id))
        }catch (err) {
            res.sendStatus(500)
        }
    }
}