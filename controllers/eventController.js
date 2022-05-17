
import readline from 'readline';
import express from "express";
import eventViews from "../views/eventViews.js";
import eventModel from "../models/eventModel.js";

export default {
    //printUsage: function() {
        //console.log(eventViews.usage);
    //},

    //getAllEvents: (req, res) => {
        //res.render("default", { happening: eventModel.getEvents() });
    //},
        createEvent: (req, res) => {
            const title = req.body.title;
            const date = req.body.date;
            const description = req.body.description;
    
            console.log(title, date, description);
            // Controller Method for creating new quote
            //const isOK = eventModel.addEvent(title, date);

            const check = eventModel.addEvent(title, date, description);
    
            // Check if something went wrong
            if (!check) {
                res.render("404", { message: "Could not save event" });
                return;
            }

            res.render("index", { events: eventModel.getEvents() });
        },
        getAllEvents: (req, res) => {
            res.render("index", { events: eventModel.getEvents() });
        },
        removeEvent: (req, res) => {
            const id = Number(req.params.id);
    
            /*if (id < 0) {
                console.log(quoteViews.errorInvalidId);
                return;
            }*/
    
            const removeThisEvent = eventModel.getEvents(id);
            //const isOK = eventModel.removeEvent(removeThisEvent.id);
    
            /*
            if (!isOK) {
                console.log(eventViews.errorQuoteNotRemoved);
                return;
            } */
    
            console.log(removeThisEvent);
    
            res.redirect('/');
        },
}