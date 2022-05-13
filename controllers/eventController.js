
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
    
            console.log(title, date);
            // Controller Method for creating new quote
            //const isOK = eventModel.addEvent(title, date);

            const check = eventModel.addEvent(title, date);
    
            // Check if something went wrong
            if (!check) {
                res.render("404", { message: "Could not save event" });
                return;
            }

            res.render("index", { events: eventModel.readEvents() });
        },
        getAllEvents: (req, res) => {
            res.render("index", { events: eventModel.readEvents() });
        }
}