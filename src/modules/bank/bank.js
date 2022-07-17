const model = require('./model')

module.exports = {
    GET_B: async(req, res) => {
        try {
            const {id, year} = req.params
            const bankIn = await model.Bank_Info(id)
            const calcAl = await model.Calc_All(id,year)
            const objects = Object.assign(bankIn, calcAl)
            res.json([objects])
        } catch (error) {
            res.sendStatus(500)
        }
        
    }, 

    GET: async (_, res) => {
        try{
            res.json(await model.bank)
        }catch(err) {
            res.sendStatus(500)
        }
    },

    POST: async(req, res) => {
        try{
            const { name, upto, startingPayment, service } = req.body
            res.json(await model.newBank(name, upto, startingPayment, service))
        }catch(err) {
            res.sendStatus(500)
        }
    },

    UPDATE: async (req, res) => {
        try{
            const { name, upto, startingPayment, service } = req.body
            res.json(await model.editBank(name, upto, startingPayment, service))
        }catch(err) {
            res.sendStatus(500)
        }
    },

    DELETE: async(req, res) => {
        try {
            const { id } = req.body
            res.json(await model.delBank(id))
        } catch (err) {
            res.sendStatus(500)
        }
    }
 
} 
