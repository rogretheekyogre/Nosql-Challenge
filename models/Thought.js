const { Schema, model,Types } = require('mongoose');
const{format_date}=require("../utils/helper.js")
const reactionsSchema = new Schema(
    {
        reactionId:{type:Schema.Types.ObjectId,default:()=>new Types.ObjectId()},
      reactionBody: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      userName: {
        type: String,
        required: true,
       
      },
      createdAt:{type:Date,default:Date.now,get:ts=>format_date(ts)},
      
      reactions: [
        reactionsSchema
      ],
     
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false,
      _id:false
    }
  );
// Schema to create a course model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    userName: {
      type: String,
      required: true,
     
    },
    createdAt:{type:Date,default:Date.now,get:ts=>format_date(ts)},
    
    reactions: [
      reactionsSchema
    ],
   
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
);
thoughtSchema.virtual("reactionCount").get(function(){
return this.reactions.length


})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
