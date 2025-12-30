const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    title :{
        type : String,
        required : true
    },
    date : {
        type : String ,// yyyy/mm/dd
        required : true
    },
    completed : {
        type : Boolean,
        default : false
    }
});

module.exports = mongoose.model("Todo", TodoSchema);