import { createStore, applyMiddleware, compose} from 'redux';
import reducer from './reducers';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

let socket = io('');
console.log('socket', socket);
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");
console.log('middleware', socketIoMiddleware)
const store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);

export default store;