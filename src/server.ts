import 'dotenv/config';
import App from './app';
import AuthRoute from './routes/auth.route';
import IndexRoute from './routes/index.route';
import UsersRoute from './routes/users.route';
import EventsRoute from './routes/events.route';
import PlacesRoute from './routes/places.route';
import CitiesRoute from './routes/cities.route';
import ChatRoute from './routes/chat.route';
import validateEnv from './utils/validateEnv';
import DatabaseService from './services/database.service';
function init() {
  new DatabaseService()
    .importSQLDBQuery()
    .then(() => {
      const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new EventsRoute(), new PlacesRoute(), new CitiesRoute(), new ChatRoute()]);
      app.listen();
    })
    .catch(e => {
      console.error(e);
      if (e.toString().includes("ECONNREFUSED")) {
        console.log('Retrying in 5 seconds');
        setTimeout(() => {
          init();
        }, 5000);
      }
    });
}

validateEnv();
init();

//automate: run SQL file here
