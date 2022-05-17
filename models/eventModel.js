import {
  timingSafeEqual
} from 'crypto';
import fs from 'fs';

const dbPath = './data/db.json';

// add event 

/*const eventsDB = JSON.parse(fs.readFileSync('./data/db.json', 'utf8'));

const newEvent = {
    title: "Drinks with friends",
    date: "25/5"
};

eventsDB.push(newEvent);

fs.writeFileSync('./data/db.json', JSON.stringify(eventsDB));*/


//let result = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
//console.log(result);

/*const eventModel = {
    getEvents: function() {
        return JSON.parse(fs.readFileSync(dbPath, "utf8")); 
    }
    //getEvent: function(title) {
        //return this.getEvents().find((event) => event.title === title);
    //}
}

export default eventModel; */

const eventModel = {
  getEvents: function () {
    return JSON.parse(fs.readFileSync(dbPath, "utf8"));
  },
  getEvent: function (id) {
    return this.getEvents().find((event) => event.id === id);
  },
  saveEvents: function (events) {
    return fs.writeFileSync(dbPath, JSON.stringify(events));
  },
  addEvent: function (title, date, description) {
    // Model Method to write new quote into database
    const allEvents = this.getEvents();
    const lastEvent = allEvents[allEvents.length - 1];
    const newId = (lastEvent?.id || 0) + 1;

    // Create new quote object
    const newEvent = {
      id: newId,
      title,
      date,
      description
    };

    // Update Javascript array with new quote
    allEvents.push(newEvent);

    // Write new state to DB
    this.saveEvents(allEvents);

    return true;
  },
  removeEvent: function (id) {
    // Get all quotes
    const allEvents = this.getEvents();

    console.log("a");

    // if quotes are not defined we return false
    // to signal that something went wrong
    if (!allEvents) {
      return false;
    }

    // Remove quote specified by id
    const filteredEvents = allEvents.filter((event) => event.id !== id);

    console.log("b");

    // Write new state to db
    this.saveEvents(filteredEvents);

    console.log("c");

    return true;
  },
  updateEvent: function (id, newTitle, newDate, newDescription) {
    // Get all quotes
    const allEvents = this.getEvents();

    // if quotes are not defined we return false
    // to signal that something went wrong
    if (!allEvents) {
      return false;
    }

    // Update quote specified by id
    const idx = allEvents.findIndex((event) => event.id === id);

    console.log("a");

    if (idx < 0) {
      return false;
    }

    console.log("b");

    allEvents[idx].title = newTitle;
    allEvents[idx].date = newDate;
    allEvents[idx].description = newDescription;

    console.log(allEvents);

    // Write new state to db
    this.saveEvents(allEvents);

    console.log("c");

    return true;
  }
}

export default eventModel;