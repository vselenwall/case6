
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

            res.render("index", { events: eventModel.getEvents() });
        },
        getAllEvents: (req, res) => {
            res.render("index", { events: eventModel.getEvents() });

        },

        getAllEventsApi: (req, res) => {
            res.json({events: eventModel.getEvents() });
        },

        removeEvent: (req, res) => {
            const id = Number(req.params.id);
    
            if (id < 0) {
                console.log("error");
                return;
            }
    
            const removeThisEvent = eventModel.getEvent(id);
            const isOK = eventModel.removeEvent(removeThisEvent.id);
    
            console.log(removeThisEvent);
    
            res.redirect('/');
        },
        updateEvent: (req, res) => {
            const id = Number(req.params.id);
            const title = req.body.title;
            const date = req.body.date;

            const isOK = eventModel.updateEvent(id, title, date);
    
            res.redirect('/');
        }
    }

