const express = require('express')
const router = express.Router()


const companyModule = require('./building_company/building_company')
const complexesModule = require('./complexes/complexes')
const complexesRoom = require('./complex_room/complex_room')
const calcRoom = require('./complex_calc/complex_calc')
const bankData = require('../modules/bank/bank')

router
    .get('/', companyModule.GET)
    .post('/newBuilding', companyModule.POST)
    .get('/bank/:id/:year', bankData.GET_B)
    .get('/:id', complexesModule.GET_comp)
    .get('/:id/:id', complexesRoom.GET_ROOM)
    .get('/:id/:id/:id', calcRoom.GET_ROOM_CALC)

module.exports = router