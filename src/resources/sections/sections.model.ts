import { Schema, model } from "mongoose";
import Section from './sections.interface'

const SectionSchema = new Schema(
    {
        title: {
            type:String,
            required: true
        }
      
    },
    {timestamps:true}
);
export default model<Section>('Sections', SectionSchema);