'use strict';

import mongoose from 'mongoose';

var AppContextSchema = new mongoose.Schema({
  sodEndpoint: String,
  sodToken: String,
  store: Object,
  menu: [String]
});

export default mongoose.model('AppContext', AppContextSchema);
