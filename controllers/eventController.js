
import readline from 'readline';
import express from "express";
import eventViews from "../views/eventViews.js";
import eventModel from "../models/eventModel.js";

export default {

        createEvent: (req, res) => {
            const title = req.body.title;
            const date = req.body.date;

            const add = eventModel.addEvent(title, date);

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
    
            const removeThisEvent = eventModel.getEvent(id);
            const isOK = eventModel.removeEvent(removeThisEvent.id);

            res.redirect('/');
        },

        updateEvent: (req, res) => {
            const id = Number(req.params.id);
            const title = req.body.title;
            const date = req.body.date;

            const isOK = eventModel.updateEvent(id, title, date);
    
            res.redirect('/');
        },

        filterEvents: (req, res) => {
            let showAll = document.getElementById("show-all");
            showAll.addEventListener("click", showAllEvents)
            function showAllEvents() {
            let li = document.getElementById("list");
            li.classList.remove("remove-this");

            filterEvents(showAll);
                
            };
        },

    }

