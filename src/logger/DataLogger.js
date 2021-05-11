import os from "os";
import moment from "moment";
import mkdirp from "mkdirp";

import { fork } from 'child_process';
import path from 'path';
import finder from 'fs-finder';


const logger = (function(){

    const LOG_INTERVAL = 30000;
    const CSV_DIR_NAME = "PowerFC-Logs";
    const MAC_DRIVE_DIRECTORY = "/VOLUMES";
    const WINDOWS_DRIVE_DIRECTORY = "";
    const LINUX_DRIVE_DIRECTORY = "/media/pi";

    let results = [];
    this.init = () => {
        const csvDirectory = findCsvDirectory();
        getFilePath(csvDirectory, function csvFilePathCallback(filepath) {
            console.log("CSV files will be written to: " + filepath);

            setInterval(function () {
                fork('./src/logger/CsvWriter').send({results, filepath});
                results = [];
            }, LOG_INTERVAL);
        });
    }

    this.logData = (time, data) => {
        results.push({
            time: time,
            data: Object.assign({}, data)
        });
    }

    const findCsvDirectory = () => {
        let csvDirectory = path.join(__dirname, "logs");
        if (process.env.NODE_ENV === "production") {
            csvDirectory = path.join(__dirname, "../", "../", "logs");
            mkdirp(csvDirectory);
        }
        
        let volumes;
        switch (os.platform()) {
            case "darwin":
                volumes = finder.in(MAC_DRIVE_DIRECTORY).findDirectories();
                break;
            case "win32":
                volumes = finder.in(WINDOWS_DRIVE_DIRECTORY).findDirectories();
                break;
            default: // linux etc.
                volumes = finder.in(LINUX_DRIVE_DIRECTORY).findDirectories(); // ONLY works when there is a pi subfolder
                break;
        }

        for (const volume of volumes) {
            const foundDirectory = finder.in(volume).findDirectory(CSV_DIR_NAME);
            if (foundDirectory) {
                csvDirectory = foundDirectory;
                break;
            }
        }
        return csvDirectory;
    }

    const getFilePath = (directory, callback) => {
        let currentTime = moment();

        const getFileName = (fullDirectory, time) => {
            let name = time.format("h.mma");
            if (!finder.in(fullDirectory).findFile(name + ".csv")) {
                return path.join(fullDirectory, name + ".csv");
            }

            let iteration = 2;
            while (finder.in(fullDirectory).findFile(name + "-" + iteration + ".csv")) {
                iteration++;
            }

            return path.join(fullDirectory, name + "-" + iteration + ".csv");
        };

        let logDayFolder = currentTime.format("MM-DD-YYYY");
        if (finder.in(directory).findDirectory(logDayFolder)) {
            callback(getFileName(path.join(directory, logDayFolder), currentTime));
        } else {
            mkdirp(directory + "/" + logDayFolder, function (err) {
                if (err) { 
                    console.error("Error creating directory", err);
                } else {
                    callback(getFileName(path.join(directory, logDayFolder), currentTime));
                }
            });
        }
    }

    return this;
}).call(this || {});

export default logger;