const { fetch, fetchAll } = require('../../utils/postgres')


const COMPANY_ROOM = `
    SELECT 
        c.complexes_id,
        c.complexes_name,
            json_agg(
                json_build_object(
                    'room_id', complexes_room_id,
                    'room_count', complexes_room_counts,
                    'room_size', complexes_room_size,
                    'room_price', complexes_room_price
                )
            )complexes_room
    FROM
        complexes c
    INNER JOIN
        complexes_room 
    USING(complexes_id)
    WHERE 
        complexes_id = $1
    GROUP BY
        c.complexes_id


`

const complexRoom = (complexId) => fetch(COMPANY_ROOM, complexId)

module.exports = {
    complexRoom
}
