const { fetch, fetchAll } = require('../../utils/postgres')


const BANK =  `
    SELECT * FROM bankCalc($1)
`

const CALC = `
    SELECT * FROM calc_info($1, $2)
`

const ALL_BANK = `
    SELECT * FROM bank
`

const NEW_BANK = `
    INSERT INTO bank(bank_name, upto, starting_payment, bank_service)
    VALUES($1, $2, $3, $4)
`

const EDIT_BANK = `
    UPDATE bank SET bank_name = $1, upto = $2, starting_payment = $3, bank_service = $4 
    WHERE bank_id = $5
`

const DEL_BANK = `
    DELETE FROM bank WHERE bank_id = $1
`

const getBanks = () => fetchAll(ALL_BANK)
const Bank_Info = (bankId) => fetch(BANK, bankId)
const Calc_All = (bankId, bankYear) => fetch(CALC, bankId, bankYear)

const newBank = (name, upto, startingPayment, service) => fetch(NEW_BANK, name, upto, startingPayment, service)
const editBank = (name, upto, startingPayment, service) => fetch(EDIT_BANK, name, upto, startingPayment, service)
const delBank = (id) => fetch(DEL_BANK, id)

module.exports = {
    getBanks,
    Bank_Info, 
    Calc_All,
    newBank,
    editBank,
    delBank
}