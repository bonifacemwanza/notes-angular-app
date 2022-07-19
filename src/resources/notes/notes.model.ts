import { Schema, model } from "mongoose";
import Note from './notes.interface'

const NotesSchema = new Schema(
    {
        text: {
            type:String,
            required: true
        },
        titleId: {
            type:Schema.Types.ObjectId,
            ref:"Sections",
            required:true
        }
      
    },
    {timestamps:true}
);
export default model<Note>('Notes', NotesSchema);