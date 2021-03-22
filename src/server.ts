import 'dotenv/config';
import App from './app';
import AuthRoute from './routes/auth.route';
import IndexRoute from './routes/index.route';
import UsersRoute from './routes/users.route';
import EventsRoute from './routes/events.route';
import PlacesRoute from './routes/places.route';
import CitiesRoute from './routes/cities.route';
import validateEnv from './utils/validateEnv';


validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new EventsRoute(), new PlacesRoute(), new CitiesRoute()]);


app.listen();

//automate: run SQL file here
