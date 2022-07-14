const { fetch, fetchAll } = require('../../utils/postgres')

const CALC_ROOM = `
    SELECT
        complexes_room_id AS room_id,
        (complexes_room_size * complexes_room_price) AS room_price,
        ((complexes_room_size * complexes_room_price) / 100 * 25) AS room_percent,
        ((complexes_room_size * complexes_room_price) - (complexes_room_size * complexes_room_price) / 100 * 25 ) / 120 AS year_10,
        ((complexes_room_size * complexes_room_price) - (complexes_room_size * complexes_room_price) / 100 * 25 ) / 180 AS year_15,
        ((complexes_room_size * complexes_room_price) - (complexes_room_size * complexes_room_price) / 100 * 25 ) / 240 AS year_20
    FROM
        complexes_room
    WHERE
        complexes_room_id = $1
    ORDER BY
        complexes_room_id

`

const roomCalc = (roomId) => fetch(CALC_ROOM, roomId) 
module.exports = {
    roomCalc
}