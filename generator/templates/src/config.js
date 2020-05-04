let baseURL = "https://api.localhost";
module.exports = {
    "name": "THR",
    "debug": true,
    "routerMode": "hash",
    "language": "en",
    "mountId": "app",
    "baseURL": baseURL,
    "prefix": "/v1",
    "general": {
        startYear: 2019
    },
    "storage": {
        name: "default",
        driver: ["asyncStorage"],
        size: 4980736,
        storeName: "app"
    },
    "datetime": {
        "date": {
            "format": "YYYY-MM-DD"
        },
        "time": {
            "format": "HH:mm:ss"
        }
    }
}
