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

const edit_company = `
    UPDATE building_company SET  building_company_name = $1 WHERE building_company_id = $2
`

const del_company = `
    DELETE FROM building_company WHERE building_company_id = $1
`


const company = () => fetchAll(building_company)
const newCompany = (name) => fetch(new_company, name)
const editCompany = (name, id) => fetch(edit_company, name, id)
const delCompany = (id) => fetch(del_company, id)

module.exports = {
    company,
    newCompany,
    editCompany,
    delCompany
}