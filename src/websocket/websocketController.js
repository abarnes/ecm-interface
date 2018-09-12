import WebSocket from 'ws';
import store from '../store/EngineData';
import { wsData, validateWsMessage } from '../utils/WebsocketUtil';

const server = new WebSocket.Server({ port: 8888 });

let sockets = [];

export const startServer = () => {
    console.log("Websocket: server started");

    server.on('connection', function connection(ws) {
        console.log("Websocket: connection");
        sockets.push(ws);

        ws.on('message', function incoming(message) {
            console.log('Websocket: received: %s', message);

            if (!validateWsMessage(message)) {
                return;
            }

            // TODO handle this stuff
        });
    });
}

const stateChangeCallback = function stateChangeCallback(state) {
    // console.log("Websocket: sending updated state ", state);

    sockets.forEach(socket => {
        socket.send(wsData("data_update", state));
    });
}

store.subscribeToStateChange(stateChangeCallback);