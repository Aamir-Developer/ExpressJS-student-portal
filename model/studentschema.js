const mongoose = require('mongoose')


const Schema = mongoose.Schema;
// name, age, studentId, class
 
const studentData = new Schema({
  name: {type : String, required : true},
  "age":  {type : Number, required : true},
  studentId: {type : String, required : true, unique : true},
  class:  {type : String, required : true},
});

module.exports = mongoose.model('studentDb',studentData )