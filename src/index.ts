
import 'dotenv/config';
require('module-alias/register');
import validateEnv  from './utils/validateEnv';
import App from './app';
import PostController from './resources/notes/notes.controller';




validateEnv();

const app = new App([
    new PostController()
], Number(process.env.PORT))

app.listen()

