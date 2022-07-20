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

const ROOM = `
    SELECT * FROM complexes_room
`

const NEW_COMPLEX_ROOM = `
    INSERT INTO complexes_room(complexes_room_price, complexes_room_counts, complexes_room_size, complexes_id)
    VALUES($1, $2, $3, $4)
`

const EDIT_COMPLEX_ROOM = `
    UPDATE complexes_room SET complexes_room_price = $1, complexes_room_counts = $2, complexes_room_size = $3,
    WHERE complexes_room_id = $4
`

const DELETE_COMPLEX_ROOM = `
    DELETE FROM complexes_room WHERE complexes_room_id = $1
`

const rooms = () => fetchAll(ROOM)
const complexRoom = (complexId) => fetch(COMPANY_ROOM, complexId)
const newComplexRoom = (price, count, size, complexID) => fetch(NEW_COMPLEX_ROOM, price, count, size, complexID)
const editComplexRoom = (price,count, size, id) => fetch(EDIT_COMPLEX_ROOM, price, count, size, id)
const delComplexRoom = (id) => fetch(DELETE_COMPLEX_ROOM, id)

module.exports = {
    rooms,
    complexRoom,
    newComplexRoom,
    editComplexRoom,
    delComplexRoom
}
