import fs from 'fs'
import os from "os"
import defaultThresholdConfig from '../config/DefaultThresholdConfig'
import defaultLayoutConfig from '../config/DefaultLayoutConfig'
import Finder from 'fs-finder'

const CONFIG_DIR_NAME = "PowerFC-Config";
const THRESHOLD_CONFIG_FILE_NAME = "thresholds.json";
const LAYOUT_CONFIG_FILE_NAME = "layout.json";
const MAC_DRIVE_DIRECTORY = "/VOLUMES";
const WINDOWS_DRIVE_DIRECTORY = "";
const LINUX_DRIVE_DIRECTORY = "/media/pi";

let cachedThresholds = null;
let cachedLayout = null;

export const getThresholdConfig = () => {
    if (cachedThresholds) {
        return cachedThresholds;
    }

    cachedThresholds = findConfigFileByName(THRESHOLD_CONFIG_FILE_NAME);
    if (!cachedThresholds) {
        cachedThresholds = defaultThresholdConfig;
    }
    return cachedThresholds;
}

export const setThresholdConfig = (config) => {
    if (!config) {
        return;
    }

    cachedThresholds = config;
    writeConfigFile(THRESHOLD_CONFIG_FILE_NAME, config);
}

export const getLayoutConfig = () => {
    if (cachedLayout) {
        return cachedLayout;
    }

    cachedLayout = findConfigFileByName(LAYOUT_CONFIG_FILE_NAME);
    if (!cachedLayout || typeof cachedLayout !== "object" || !cachedLayout.monitors || !cachedLayout.gauges) {
        cachedLayout = defaultLayoutConfig;
    }
    return cachedLayout;
}

export const setLayoutConfig = (config) => {
    if (!config) {
        return;
    }

    cachedLayout = config;
    writeConfigFile(LAYOUT_CONFIG_FILE_NAME, config);
}


// private

const filePathFromName = (directory, name) => {
    return directory + "/" + name;
}

const writeConfigFile = (filename, config) => {
    const foundDirectory = findConfigDirectoryWithFile(filename);
    if (foundDirectory) {
        fs.writeFileSync(filePathFromName(foundDirectory, filename), JSON.stringify(config));
    }
}

const findConfigFileByName = (name) => {
    const foundDirectory = findConfigDirectoryWithFile(name);
    if (foundDirectory) {
        const contents = fs.readFileSync(filePathFromName(foundDirectory, name));
        try {
            let jsonContents = JSON.parse(contents);
            console.log("Using USB-defined config " + name);
            return jsonContents;
        } catch (e) {
            console.log("Error parsing json: ", e);
        }
    }

    return null;
}

const findConfigDirectoryWithFile = (name) => {
    const foundDirectory = findConfigDirectory();
    if (foundDirectory) {
        if (Finder.in(foundDirectory).findFile(name)) {
            return foundDirectory;
        }
    }
    return false;
}

const findConfigDirectory = () => {
    let volumes;
    switch (os.platform()) {
        case "darwin":
            volumes = Finder.in(MAC_DRIVE_DIRECTORY).findDirectories();
            break;
        case "win32":
            volumes = Finder.in(WINDOWS_DRIVE_DIRECTORY).findDirectories();
            break;
        default: // linux etc.
            volumes = Finder.in(LINUX_DRIVE_DIRECTORY).findDirectories(); // ONLY works when there is a pi subfolder
            break;
    }

    for (const volume of volumes) {
        const foundDirectory = Finder.in(volume).findDirectory(CONFIG_DIR_NAME);
        if (foundDirectory) {
            return foundDirectory;
        }
    }

    return null;
}