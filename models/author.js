var mongoose = require('mongoose');

var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual property for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

// Virtual property for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual property for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
  var date_birth = this.date_of_birth ? moment(this.date_of_birth).format('MMMM Do, YYYY') : '';
  var date_death = this.date_of_death ? moment(this.date_of_death).format('MMMM Do, YYYY') : '';
  return date_birth + ' ~ ' + date_death;
});
//return this.date_of_birth ? moment(this.date_of_birth).format('YYYY-MM-DD') : '' + ' to ' + this.date_of_death ? moment(this.date_of_death).format('YYYY-MM-DD') : '';


// Export model
module.exports = mongoose.model('Author', AuthorSchema);
