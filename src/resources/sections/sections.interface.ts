import {Document} from 'mongoose'

export default interface Section extends Document {
    title:string;
}