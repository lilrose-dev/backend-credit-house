const { fetch, fetchAll } = require('../../utils/postgres')

const COMPANY = `
    SELECT 
        b.building_company_id AS company_id,
        b.building_company_name AS company_name,
        json_agg(
            json_build_object(
                'complexes_id', complexes_id,
                'complexes_name', complexes_name
            )
        )complexes
    FROM 
        building_company b
    INNER JOIN
        complexes 
    USING(building_company_id)
    WHERE
        building_company_id = $1
    GROUP BY
        b.building_company_id

`

const NEW_COMPLEX = `
    INSERT INTO complexes(complexes_name, building_company_id)
        VALUES($1, $2)
`

const EDIT_COMPLEX = `
    UPDATE complexes SET complexes_name = $1 WHERE complexes_id = $2
`

const DELETE_COMPLEX = `
    DELETE FROM complexes WHERE complexes_id = $1
`

const complexes = (complexID) => fetch(COMPANY, complexID)
const newComplex = (name, companyID) => fetch(NEW_COMPLEX, name, companyID)
const editComplex = (name, id) => fetch(EDIT_COMPLEX, name, id)
const delComplex = (id) => fetch(DELETE_COMPLEX, id)

module.exports = {
    complexes,
    newComplex,
    editComplex,
    delComplex
}       