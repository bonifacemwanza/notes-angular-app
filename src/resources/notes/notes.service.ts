import NoteModel from './notes.model'
import Note from './notes.interface'

class NotesService {
    private note = NoteModel;


    public async create(title:string, body: string): Promise<Note> {
        try {
            const createPost =  await this.note.create({title,body});
            return createPost;
        } catch (error) {
            throw new Error("unable to post");
            
        }
    }

}
export default NotesService;