const model = require('./model')


module.exports = {
    GET_ROOM: async (req, res) => {
        try {
            const { id } = req.params
            res.json(await model.complexRoom(id))
        }catch(err) {
            res.sendStatus(500)
        }
    }
}
