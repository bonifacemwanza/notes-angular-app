import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import HttpException from '../../utils/exceptions/http.exception';
import validationMiddleware from '../../middleware/validation.middleware'
import validate from './notes.validate'
import NotesService from    './notes.service';
import mongoose from 'mongoose';

class NotesController implements Controller {
    public router = Router();
    public path = '/notes';
    private createNote = '/create'
    private updateNote = '/updateNote'
    private deleteNote = '/delete/:postId'
    private noteService =  new NotesService()

    constructor(){
        this.initialiseRoutes()
    }

    private initialiseRoutes():void {
        this.router.get(`${this.path}`, this.getNotes)
        this.router.post(`${this.path+this.createNote}`, this.create)
        this.router.put(`${this.path+this.updateNote}`, this.update)
        this.router.delete(`${this.path+this.deleteNote}`, this.delete)
    }
    private getNotes = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> =>  {
        try {
              const {section} = req.query;   
              const post =  await this.noteService.get(section as string | undefined)
              res.send(post)
          } catch (error:any) {
              next(new HttpException(400, error.message))
          }
    }

    private create = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
          //  const { title, body } = req.body;
            const post =  await this.noteService.create(req.body)
            res.send(post)
        } catch (error:any) {
            next(new HttpException(400, error.message))
        }
    }
    private update = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { postId, text } = req.body;
            const update =  await this.noteService.update({_id:new mongoose.Types.ObjectId(postId)},req.body)
            res.send(update)
        } catch (error:any) {
            next(new HttpException(400, error.message))
        }
    }
    private delete = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { postId } = req.params;
            const deleteNote =  await this.noteService.delete({_id:postId})
            res.send(deleteNote)
        } catch (error:any) {
            next(new HttpException(400, error.message))
        }
    }

}
export default NotesController;