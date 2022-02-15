const { response } = require("express");
const Event = require('../models/Event');


const getEvents = async(req, res = response ) => {

    const events = await Event.find()
                              .populate('user','name')

    res.json({
        ok: true,
        events
    })

}
const createEvent = async(req, res = response ) => {
    

    const newEvent = new Event(req.body);

    try {

        newEvent.user = req.uid;

        const savedEvent = await newEvent.save()

        res.json({
            ok: true,
            event: savedEvent
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: true,
            msg: 'talk to the administrator'
        })
    }

}
const updateEvent = async(req, res = response ) => {

    const eventId = req.params.id;

    const uid = req.uid;

    try {

        const event = await Event.findById( eventId );

        if( !event ) {
            return res.status(404),json({
                ok: false,
                msg: 'The event doesnt exist for that id'
            });
        }

        if( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have privilege to edit this event'
            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updateEvent = await Event.findByIdAndUpdate( eventId, newEvent, { new: true } );

        res.json({
            ok: true,
            event: updateEvent
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'tallk to the administrator'
        })
    }


}
const deleteEvent = async(req, res = response ) => {
    const eventId = req.params.id;

    const uid = req.uid;

    try {

        const event = await Event.findById( eventId );

        if( !event ) {
            return res.status(404),json({
                ok: false,
                msg: 'The event doesnt exist for that id'
            });
        }

        if( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have privilege to delete this event'
            });
        }



        const deleteEvent = await Event.findByIdAndDelete( eventId );

        res.json({
            ok: true,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'tallk to the administrator'
        })
    }

}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}