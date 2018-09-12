export default {
    rpm: {
        warning: {
            enabled: true,
            greaterThan: true,
            value: 7500
        },
        critical: {
            enabled: true,
            greaterThan: true,
            value: 8100
        }
    },
    speed: {
        warning: {
            enabled: false,
            greaterThan: true,
            value: 140
        },
        critical: {
            enabled: false,
            greaterThan: true,
            value: 200
        }
    },
    knock: {
        warning: {
            enabled: true,
            greaterThan: true,
            value: 50
        },
        critical: {
            enabled: true,
            greaterThan: true,
            value: 60
        }
    },
    waterTemp: {
        warning: {
            enabled: true,
            greaterThan: true,
            value: 97
        },
        critical: {
            enabled: true,
            greaterThan: true,
            value: 108
        }
    },
    boost: {
        warning: {
            enabled: true,
            greaterThan: true,
            value: 518
        },
        critical: {
            enabled: true,
            greaterThan: true,
            value: 672
        }
    },
    airTemp: {
        warning: {
            enabled: false,
            greaterThan: true,
            value: 60
        },
        critical: {
            enabled: false,
            greaterThan: true,
            value: 80
        }
    },
    batteryVoltage: {
        warning: {
            enabled: true,
            greaterThan: false,
            value: 13.5
        },
        critical: {
            enabled: true,
            greaterThan: false,
            value: 13
        }
    },
    injectorDuty: {
        warning: {
            enabled: true,
            greaterThan: true,
            value: 90
        },
        critical: {
            enabled: true,
            greaterThan: true,
            value: 97
        }
    },
    leadingIgnition: {
        warning: {
            enabled: false,
            greaterThan: true,
            value: 0
        },
        critical: {
            enabled: false,
            greaterThan: true,
            value: 0
        }
    },
    trailingIgnition: {
        warning: {
            enabled: false,
            greaterThan: true,
            value: 0
        },
        critical: {
            enabled: false,
            greaterThan: true,
            value: 0
        }
    }
}