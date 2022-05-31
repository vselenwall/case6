import {
  timingSafeEqual
} from 'crypto';
import fs from 'fs';

const dbPath = './data/db.json';

const eventModel = {
  // get all events 
  getEvents: function () {
    return JSON.parse(fs.readFileSync(dbPath, "utf8"));
  },

  // get specific event
  getEvent: function (id) {
    return this.getEvents().find((event) => event.id === id);
  },

  // save event 
  saveEvents: function (events) {
    return fs.writeFileSync(dbPath, JSON.stringify(events));
  },
  
  addEvent: function (title, date) {
    // get all events from db
    const allEvents = this.getEvents();

    // add correct id
    const lastEvent = allEvents[allEvents.length - 1];
    const newId = (lastEvent?.id || 0) + 1;

    // create new obj
    const newEvent = {
      id: newId,
      title,
      date
    };

    // push new event to all ev
    allEvents.push(newEvent);

    // save to db
    this.saveEvents(allEvents);

    return true;
  },

  removeEvent: function (id) {
    // get all events from db
    const allEvents = this.getEvents();
    
    // filter event to remove
    const filteredEvents = allEvents.filter((event) => event.id !== id);

    // save filtered event
    this.saveEvents(filteredEvents);

    return true;
  },

   updateEvent: function (id, newTitle, newDate) {
    // get all events from db
    const allEvents = this.getEvents();

    // find specific id to update
    const idi = allEvents.findIndex((event) => event.id === id);

    // update new title and date
    allEvents[idi].title = newTitle;
    allEvents[idi].date = newDate;

    // save events to db
    this.saveEvents(allEvents);

    return true;
  },

  filterEvents: function (id) {
    return this.getEvents().find((event) => event.id === id);
    
  },
 
}

export default eventModel;


