import axios from "axios";
import {toast} from "react-toastify";
import WarningIcon from '@material-ui/icons/Warning';
import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";

export const FETCH_EVENTS_REQUEST = 'FETCH_EVENTS_REQUEST';
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE';

export const FETCH_EVENT_REQUEST = 'FETCH_EVENT_REQUEST';
export const FETCH_EVENT_SUCCESS = 'FETCH_EVENT_SUCCESS';
export const FETCH_EVENT_FAILURE = 'FETCH_EVENT_FAILURE';

export const CREATE_EVENT_REQUEST = 'CREATE_EVENT_REQUEST';
export const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
export const CREATE_EVENT_FAILURE = 'CREATE_EVENT_FAILURE';

export const fetchEventsRequest = () => ({type: FETCH_EVENTS_REQUEST});
export const fetchEventsSuccess = events => ({type: FETCH_EVENTS_SUCCESS, payload: events});
export const fetchEventsFailure = () => ({type: FETCH_EVENTS_FAILURE});

export const fetchEventRequest = () => ({type: FETCH_EVENT_REQUEST});
export const fetchEventSuccess = event => ({type: FETCH_EVENT_SUCCESS, payload: event});
export const fetchEventFailure = () => ({type: FETCH_EVENT_FAILURE});

export const createEventRequest = () => ({type: CREATE_EVENT_REQUEST});
export const createEventSuccess = () => ({type: CREATE_EVENT_SUCCESS});
export const createEventFailure = (error) => ({type: CREATE_EVENT_FAILURE, payload: error});


export const fetchEvents = (query) => {
  return async (dispatch) => {
    try {
      dispatch(fetchEventsRequest());
      const response = await axiosApi.get('/events' + query);
      dispatch(fetchEventsSuccess(response.data));
    } catch (error) {
      dispatch(fetchEventsFailure());
      toast.error('Could not fetch events!', {
        theme: 'colored',
        icon: <WarningIcon/>
      });
    }
  }
};

export const fetchEvent = id => {
  return async dispatch => {
    try {
      dispatch(fetchEventRequest());
      const response = await axios.get('http://localhost:8000/events/' + id);
      dispatch(fetchEventSuccess(response.data));
    } catch (e) {
      dispatch(fetchEventFailure());
    }
  };
};

export const createEvent = eventsData => {
  return async dispatch => {
    try {
      dispatch(createEventRequest());
      await axiosApi.post('/events', eventsData);
      dispatch(createEventSuccess());
      dispatch(historyPush('/'));
      toast.success('Event created');
    } catch (e) {
      dispatch(createEventFailure(e.response.data));
      toast.error('Could not create event');
    }
  };
};

export const deleteEvent = (id) => {
    return async dispatch => {
        try {
            dispatch(fetchEventRequest());
            await axiosApi.delete('/events/' + id);
            dispatch(fetchEventSuccess());
            toast.success('Event deleted');
        } catch (e) {
            dispatch(fetchEventFailure());
            throw e;
        }
    };
};