import qs from 'query-string';
import axios from 'util/Api';
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  INIT_URL,
  SIGNOUT_USER_SUCCESS,
  USER_DATA,
  USER_TOKEN_SET
} from '../constants/ActionTypes';

export const setInitUrl = (url) => ({
  type: INIT_URL,
  payload: url
});

export const userSignIn = ({ id, password }) => (dispatch) => {
  dispatch({ type: FETCH_START });
  axios.post('/auth/login', {
    id,
    password,
    app_secret: 'G%H%s&^1ay0AwPeHN*!cSh86WuT8pt9$zxXq^8R@ZVPrj8$M5A',
  }, {
    params: {
      app_id: 'cms'
    }
  }).then(({ data: response }) => {
    if (response.status) {
      const access_token = { login: 1 };
      localStorage.setItem('cms-mstrtt-tkn', JSON.stringify(access_token));
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: USER_TOKEN_SET, payload: access_token });
      if (window.Notification && Notification.permission === 'default') {
        Notification.requestPermission().then(() => {
        });
      }
    } else {
      dispatch({ type: FETCH_ERROR, payload: response.message });
    }
  }).catch((error) => {
    dispatch({ type: FETCH_ERROR, payload: error.message });
    console.error('Error****:', error.message);
  });
};

export const userSignOut = () => (dispatch) => {
  dispatch({ type: FETCH_START });
  axios.post('/auth/logout').then(({ data: response }) => {
    if (response.status) {
      dispatch({ type: FETCH_SUCCESS });
      localStorage.removeItem('cms-mstrtt-tkn');
      localStorage.removeItem('cms-mstrtt-usr');
      dispatch({ type: FETCH_SUCCESS });
      dispatch({ type: SIGNOUT_USER_SUCCESS });
    } else {
      dispatch({ type: FETCH_ERROR, payload: response.message });
    }
  }).catch((error) => {
    dispatch({ type: FETCH_ERROR, payload: error.message });
    console.error('Error****:', error.message);
  });
};

export const getUser = () => (dispatch) => {
  dispatch({ type: FETCH_START });
  axios.get('/users/me').then(({ data: response }) => {
    if (response.status) {
      dispatch({ type: FETCH_SUCCESS });
      localStorage.setItem('cms-mstrtt-usr', JSON.stringify(response.data));
      dispatch({ type: USER_DATA, payload: response.data });
    } else {
      dispatch({ type: FETCH_ERROR, payload: response.message });
    }
  }).catch((error) => {
    dispatch({ type: FETCH_ERROR, payload: error.message });
    console.error('Error****:', error.message);
  });
};

export const handleCallback = (query) => {
  const { code } = qs.parse(query);

  if (!code) window.location.href = '/signin';

  try {
    axios.get('auth/callback', {
      params: {
        code
      }
    }).then(({ data: response }) => {
      const { data } = response;
      localStorage.setItem('cms-mstrtt-tkn', data.token);
      window.location.href = '/';
    });
  } catch (error) {
    console.error('Err::', error);
    window.location.href = '/signin';
  }
};
