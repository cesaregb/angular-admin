/**
 * AppContext model events
 */

'use strict';

import {EventEmitter} from 'events';
import AppContext from './appContext.model';
var AppContextEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AppContextEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  AppContext.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    AppContextEvents.emit(event + ':' + doc._id, doc);
    AppContextEvents.emit(event, doc);
  }
}

export default AppContextEvents;
