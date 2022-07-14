const { fetch, fetchAll } = require('../../utils/postgres')


const BANK =  `
    SELECT * FROM bankCalc($1)
`

const CALC = `
    SELECT * FROM calc($1, $2)

`

const Bank_Info = (bankId) => fetch(BANK, bankId)
const Calc_All = (bankId, bankYear) => fetch(CALC, bankId, bankYear)

module.exports = {
    Bank_Info, 
    Calc_All
}