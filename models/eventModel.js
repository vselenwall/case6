import { timingSafeEqual } from 'crypto';
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
    getEvents: function() {
        return JSON.parse(fs.readFileSync(dbPath, "utf8")); 
    },
    getEvent: function (id) {
        return this.getEvents().find((title) => title.id === id);
      },
    saveEvents: function (title) {
        return fs.writeFileSync(dbPath, JSON.stringify(title));
      },
      addQuote: function (title, date) {
        // Model Method to write new quote into database
        const allEvents = this.getEvents();
    
        // if quotes are not defined we return false
        // to signal that something went wrong
        if (!allEvents) {
          console.log("not defined");
          return false;
        }
    
        // if quote or author is not defined then exit early
        if (!title || !date) {
          console.log("title and date is not defined");
          return false;
        }
    
        const lastEvent = allEvents[allEvents.length - 1];
        const newId = (lastEvent?.id || 0) + 1; 
    
        // Create new quote object
        const newEvent = { id: newId, title, date};
    
        // Update Javascript array with new quote
        allEvents.push(newEvent);
    
        // Write new state to DB
        this.saveQuotes(allEvents);
    
        return true;
      }
}

export default eventModel;