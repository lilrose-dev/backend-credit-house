const model = require('./model')


module.exports = {
    GET_ROOM_CALC: async (req, res) => {
        try {
            const { id } = req.params
            res.json(await model.roomCalc(id))
        }catch(err) {
            res.sendStatus(500)
        }
    }
}