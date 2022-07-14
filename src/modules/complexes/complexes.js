const model = require('./model')


module.exports = {
    GET_comp: async (req, res) => {
        try {
            const { id } = req.params
            res.json(await model.complexes(id))
        }catch(err) {
            res.sendStatus(500)
        }
    }
}