import readline from 'readline';
import express from "express";
import eventViews from "../views/eventViews.js";
import eventModel from "../models/eventModel.js";

export default {

    createEvent: (req, res) => {
        // create event w title and date
        const title = req.body.title;
        const date = req.body.date;

        // add event to eventmodel
        const add = eventModel.addEvent(title, date);

        res.render("index", {
            events: eventModel.getEvents()
        });
    },

    getAllEvents: (req, res) => {
        res.render("index", {
            events: eventModel.getEvents()
        });

    },

    getAllEventsApi: (req, res) => {
        res.json({
            events: eventModel.getEvents()
        });
    },

    removeEvent: (req, res) => {
        // find id and remove event w this id
        const id = Number(req.params.id);

        const removeThisEvent = eventModel.getEvent(id);
        const isOK = eventModel.removeEvent(removeThisEvent.id);

        res.redirect('/');
    },

    updateEvent: (req, res) => {
        // update title, date and get new id
        const id = Number(req.params.id);
        const title = req.body.title;
        const date = req.body.date;

        const isOK = eventModel.updateEvent(id, title, date);

        res.redirect('/');
    },

}