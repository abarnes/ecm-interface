export const wsData = (command, payload) => {
    return JSON.stringify({
        command: command,
        payload: payload
    })
}

export const validateWsMessage = (data) => {
    try {
        data = JSON.parse(data);
    } catch (e) {
        return false
    }
    
    return (typeof data.command !== "undefined" && typeof data.payload !== "undefined");
}