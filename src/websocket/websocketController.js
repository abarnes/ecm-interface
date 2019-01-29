import WebSocket from 'ws';
import store from '../store/EngineData';
import { wsData, validateWsMessage } from '../utils/WebsocketUtil';

const server = new WebSocket.Server({ port: 8888 });

let sockets = [];

export const startServer = () => {
    console.log("Websocket: server started");

    server.on('connection', function connection(ws) {
        console.log("Websocket: connection");
        ws.id = sockets.length + 1;
        sockets.push(ws);

        ws.on('message', function incoming(message) {
            console.log('Websocket: received: %s', message);

            if (!validateWsMessage(message)) {
                return;
            }

            // TODO handle any incoming messages
        });

        ws.on("close", function close() {
            const socketClosing = sockets.filter(socket => ws.id === socket.id);
            if (socketClosing.length) {
                sockets = sockets.splice(sockets.indexOf(socketClosing[0]), 1);
                console.log("Socket with id " + socketClosing[0].id + " closing");
            }
        });
    });
}

const stateChangeCallback = function stateChangeCallback(state) {
    runFunctionOnEachConnectedSocket(() => socket.send(wsData("data_update", state)));
}

export const publishGaugeLayoutChange = function publishGaugeLayoutChange(layout) {
    runFunctionOnEachConnectedSocket(() => socket.send(wsData("gauge_layout_update", layout)));
}

const runFunctionOnEachConnectedSocket = function runFunctionOnEachConnectedSocket(callback) {
    sockets.forEach(socket => {
        if (socket.readyState === 1) {
            callback();
        }
    });
}   

store.subscribeToStateChange(stateChangeCallback);