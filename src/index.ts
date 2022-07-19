
import 'dotenv/config';
require('module-alias/register');
import validateEnv  from './utils/validateEnv';
import App from './app';
import PostController from './resources/notes/notes.controller';
import SectionsController from './resources/sections/sections.controller'




validateEnv();

const app = new App([
    new PostController(),
    new SectionsController()
], Number(process.env.PORT))

app.listen()

