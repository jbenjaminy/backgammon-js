import { createStore, applyMiddleware, compose} from 'redux';
import reducer from './reducers';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

let socket = io('');
let socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');
export default const store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);
