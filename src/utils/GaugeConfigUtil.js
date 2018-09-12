export const roundingTransform = (points, value) => {
    return Math.round(value, points);
}

export const voltageSuffix = (value) => {
    return value + "V";
}

export const tempTransform = (value) => {
    return Math.round(celciusToFahrenheit(value));
}

export const degreeSuffix = (value) => {
    return value + "&deg;"
}

export const percentSuffix = (value) => {
    return value + "%";
}

export const pressureTransform = (value) => {
    return Math.round(mmHGToPsi(value));
}

export const pressureSuffix = (value) => {
    return value > 0 ? (value + "PSI") : (value + "inHG");
}

export const booleanTransform = (value) => {
    return value ? "On" : "Off";
}

export const celciusToFahrenheit = (value) => {
    return ((value * (9/5)) + 32);
}

export const mmHGToPsi = (value) => {
    return (value === 0) ? 0 : (value / 51.715);
}

export const kphToMph = (value) => {
    return (value * 0.62137);
}