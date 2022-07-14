const model = require('./model')

module.exports = {
    GET_B: async(req, res) => {
        
        const {id, year} = req.params
        console.log(req.params);
        const bankIn = await model.Bank_Info(id)
        const calcAl = await model.Calc_All(id,year)
        const objects = Object.assign(bankIn, calcAl)
        res.json([objects])
        console.log([objects]);
        
    }
 
} 
