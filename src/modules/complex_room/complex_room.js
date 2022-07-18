const model = require('./model')


module.exports = {

    GET: async (_, res)=> {
        try {
            res.json(await model.rooms())
        } catch (error) {
            res.sendStatus(500)
        }
    },

    GET_ROOM: async (req, res) => {
        try {
            const { id } = req.params
            res.json(await model.complexRoom(id))
        }catch(err) {
            res.sendStatus(500)
        }
    },

    POST: async (req, res) => {
        try{
            const { price, count, size, complexID } = req.body
            res.json(await model.newComplexRoom(price, count, size, complexID))
        }catch (err) {
            res.sendStatus(500)
        }
    },

    UPDATE: async (req, res) => {
        try{
            const { price, count, size } = req.body
            res.json(await model.editComplexRoom(price, count, size))
        }catch (err) {
            res.sendStatus(500)
        }
    },

    DELETE: async (req, res) => {
        try {
            const { id } = req.body
            res.json(await model.delComplexRoom(id))
        } catch (err) {
            res.sendStatus(500)
        }
    }
}
