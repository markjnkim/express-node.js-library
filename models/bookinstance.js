var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var BookInstanceSchema = new Schema(
  {
    book: {type: Schema.ObjectId, ref: 'Book', required: true},
    imprint: {type: String, required: true},
    status: {type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
    due_back: {type: Date, default: Date.now},
  }
);

// Virtual prop for bookinstance's url
// Virtual prop using moment for date format
BookInstanceSchema
  .virtual('url')
  .get(function () {
    return '/catalog/bookinstance/' + this._id;
  });

BookInstanceSchema
  .virtual('due_back_formatted')
  .get(function () {
    return moment(this.due_back).format('MMMM Do, YYYY');
});

// Formatted Date to prepopulate update method
BookInstanceSchema
  .virtual('due_back_YYYY_MM_DD')
  .get(function () {
    return moment(this.due_back).format('YYYY-MM-DD');
});


// Export model
module.exports = mongoose.model('BookInstance', BookInstanceSchema);
