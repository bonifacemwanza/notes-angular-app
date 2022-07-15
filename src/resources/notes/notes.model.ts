import { Schema, model } from "mongoose";
import Note from './notes.interface'

const NotesSchema = new Schema(
    {
        title: {
            type:String,
            required: true
        }, 
        body: {
            type: String,
            required: true
        }
    },
    {timestamps:true}
);
export default model<Note>('Notes', NotesSchema);