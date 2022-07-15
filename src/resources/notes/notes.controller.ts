import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import HttpException from '../../utils/exceptions/http.exception';
import validationMiddleware from '../../middleware/validation.middleware'
import validate from './notes.validate'
import NotesService from    './notes.service';

class NotesController implements Controller {
    public path = '/notes';
    public router = Router();
    private noteService =  new NotesService()

    constructor(){
        this.initialiseRoutes()
    }

    private initialiseRoutes():void {
        this.router.post(`${this.path}`, validationMiddleware(validate.create), this.create)
    }

    private create = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { title, body } = req.body;
            const post =  await this.noteService.create(title,body)

            res.status(201).json({post})
        } catch (error:any) {
            next(new HttpException(400, error.message))
        }
    }

}
export default NotesController;