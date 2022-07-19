import {Document} from 'mongoose'
import Section from '../sections/sections.interface';
export default interface Post extends Document {
    text:string;
    titleId:Section["_id"];

}