const { fetch, fetchAll } = require('../../utils/postgres')

const building_company = `
    SELECT 
        *
    FROM 
        building_company

`

const new_company = `
    INSERT INTO 
        building_company(
            building_company_name
        )
    VALUES($1)
    RETURNING *

`



const company = () => fetchAll(building_company)
const newCompany = (name) => fetch(new_company, name)


module.exports = {
    company,
    newCompany
}