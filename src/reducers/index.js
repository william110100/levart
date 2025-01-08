import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import Settings from './Settings';
import Auth from './Auth';
import Common from './Common';
import Panic from './Panic';


export default (history) => combineReducers({
  router: connectRouter(history),
  settings: Settings,
  auth: Auth,
  panic: Panic,
  commonData: Common,
});
