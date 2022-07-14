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


const complexes = (complexID) => fetch(COMPANY, complexID)

module.exports = {
    complexes
}       