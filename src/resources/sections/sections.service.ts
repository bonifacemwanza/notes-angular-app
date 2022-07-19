import SectionModel from './sections.model'
import { FilterQuery, UpdateQuery } from 'mongoose';
import notesModel from '../notes/notes.model';

class NotesService {
    private section = SectionModel;
    private note = notesModel


    public async create( body:object): Promise<any> {
        try {
            const createPost =  await this.section.create(body);
            return createPost;
        } catch(error:any) {
            throw new Error(error.message);          
        }
    }
    public async get(): Promise<any> {
        try {
            const getNotes =  await this.section.find().sort({createdAt: 1});
            return getNotes;
        } catch(error:any) {
            throw new Error(error.message);          
        }
    }
    public async update(query:FilterQuery<object>, update: UpdateQuery<object>): Promise<any> {
        try {
            const updateSection =  await this.section.findOneAndUpdate(query,update,{returnDocument:"after"});
            return updateSection;
        } catch (error:any) {
            throw new Error(error.message);          
        }
    }
    public async delete(query:FilterQuery<any>): Promise<any> {
        try {
            const deleteNotes = await this.note.deleteMany({titleId:query});
            const deleteSection =  await this.section.deleteOne({_id:query});
            return deleteSection;
        } catch (error:any) {
            throw new Error(error.message);          
        }
    }

}
export default NotesService;