const express = require('express')
const router = express.Router()


const company = require('./building_company/building_company')
const complexes = require('./complexes/complexes')
const complexesRoom = require('./complex_room/complex_room')
const calcRoom = require('./complex_calc/complex_calc')
const bankData = require('../modules/bank/bank')

router
    .get('/', company.GET)
    .get('/bank', bankData.GET_DATA)
    .get('/complex',complexes.GET)
    .get('/complexRoom', complexesRoom.GET)
    .get('/room', complexesRoom.GET)
    .post('/newComplexRoom', complexesRoom.POST)

    .post('/newBuilding', company.POST)
    .put('/updateBuilding', company.UPDATE)
    .delete('/deleteBuilding', company.DELETE)
    
    .get('/:id', complexes.GET_comp)
    .post('/newComplex', complexes.POST)
    .put('/updateComplex', complexes.UPDATE)
    .delete('/deleteComplex', complexes.DELETE)
    
    .get('/:id/:id', complexesRoom.GET_ROOM)
    .put('/updateComplexRoom', complexesRoom.UPDATE)
    .delete('/delComplexRoom', complexesRoom.DELETE)
    
    // .get('/:id/:id/:id', calcRoom.GET_ROOM_CALC)
    .post('/newBank', bankData.POST)
    .put('/updateBank', bankData.UPDATE)
    .delete('/delBank', bankData.DELETE)
    .get('/bank/:id/:year', bankData.GET_B)
    
module.exports = router