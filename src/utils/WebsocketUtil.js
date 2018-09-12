export const wsData = (command, payload) => {
    return {
        command: command,
        payload: payload
    }
}

export const validateWsMessage = (data) => {
    return (typeof data.command !== "undefined" && typeof data.payload !== "undefined");
}