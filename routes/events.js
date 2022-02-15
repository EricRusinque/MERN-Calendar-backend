/* 
    Event Routes
    /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator')
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { fieldValidate } = require('../middlewares/field-validator');
const { validateJWT } = require('../middlewares/jwt-validator');

//they all have to go through token validation

const router = Router();

router.use( validateJWT )
// get events

router.get( '/', getEvents );

// Create new event

router.post( 
    '/', 
    [
        check('title', 'the title is required').not().isEmpty(),
        check('start', 'the start date is required').custom(isDate),
        check('end', 'the end date is required').custom(isDate),
        fieldValidate
    ],
    createEvent 
);

// Update event

router.put( '/:id', updateEvent );

// delete event 

router.delete( '/:id', deleteEvent );

module.exports = router