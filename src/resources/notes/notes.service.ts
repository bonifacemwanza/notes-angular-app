import NoteModel from './notes.model'
import Note from './notes.interface'
import mongoose, { FilterQuery, UpdateQuery } from 'mongoose';

class NotesService {
    private note = NoteModel;


    public async create( body:object): Promise<any> {
        try {
            const createPost =  await this.note.create(body);
            return createPost;
        } catch(error:any) {
            throw new Error(error.message);          
        }
    }
    public async get(section: string | undefined): Promise<any> {
        
        
        try {
            var getNotes:any[] = [];
            if(section !== undefined) {
                console.log("here1")
                 getNotes =  await this.note.aggregate([  
                    {$match: {titleId: new mongoose.Types.ObjectId(section)}},
                    {
                        $lookup: {
                            from: "sections",
                            localField: "titleId",
                            foreignField: "_id",
                            as: "title"
                        }
                    },
                    {
                        $set: {
                            title: { $arrayElemAt: ["$title.title", 0] }
                        }
                    }
                    ]).sort({createdAt: 1});
                } else {
                    console.log("here2")
                     getNotes =  await this.note.aggregate([  
                        {
                            $lookup: {
                                from: "sections",
                                localField: "titleId",
                                foreignField: "_id",
                                as: "title"
                            }
                        },
                        {
                            $set: {
                                title: { $arrayElemAt: ["$title.title", 0] }
                            }
                        }
                        ]).sort({createdAt: 1});
                }
            return getNotes;
        } catch(error:any) {
            throw new Error(error.message);          
        }
    }
    public async update(query:FilterQuery<object>, update: UpdateQuery<object>): Promise<any> {
        try {
            const updateNote =  await this.note.findOneAndUpdate(query,update,{returnDocument:"after"});
            return updateNote;
        } catch (error:any) {
            throw new Error(error.message);          
        }
    }
    public async delete(query:FilterQuery<object>): Promise<any> {
        try {
            const updateNote =  await this.note.deleteOne(query);
            return updateNote;
        } catch (error:any) {
            throw new Error(error.message);          
        }
    }

}
export default NotesService;