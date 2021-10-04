"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionSetHasServerConnection = exports.actionSetGpsEnabled = exports.actionSetGpsAllowed = exports.actionSetGpsLocation = exports.actionSetNightMode = exports.actionLogMeOut = exports.actionLogMeIn = exports.useSubscribeHasServerConnection = exports.useSubscribeGps = exports.useSubscribeAuthUserId = exports.useSubscribeNightMode = void 0;
const react_ivity_1 = require("react-ivity");
const initialAppState = {
    nightMode: false,
    hasServerConnection: true,
    gps: {},
};
const appState = initialAppState;
//////////////////// Subscribers
function useSubscribeNightMode() {
    (0, react_ivity_1.useSubscribe)("nightMode");
    return appState.nightMode;
}
exports.useSubscribeNightMode = useSubscribeNightMode;
function useSubscribeAuthUserId() {
    var _a;
    (0, react_ivity_1.useSubscribe)("authUserId");
    return (_a = appState.auth) === null || _a === void 0 ? void 0 : _a.userId;
}
exports.useSubscribeAuthUserId = useSubscribeAuthUserId;
function useSubscribeGps() {
    (0, react_ivity_1.useSubscribe)("gps");
    return appState.gps;
}
exports.useSubscribeGps = useSubscribeGps;
function useSubscribeHasServerConnection() {
    (0, react_ivity_1.useSubscribe)("hasServerConnection");
    return appState.hasServerConnection;
}
exports.useSubscribeHasServerConnection = useSubscribeHasServerConnection;
//////////////////// Actions
function actionLogMeIn(userId) {
    appState.auth = {
        userId,
    };
    (0, react_ivity_1.notifySubscribers)("authUserId");
}
exports.actionLogMeIn = actionLogMeIn;
function actionLogMeOut() {
    appState.auth = undefined;
    (0, react_ivity_1.notifySubscribers)("authUserId");
}
exports.actionLogMeOut = actionLogMeOut;
function actionSetNightMode(isNightMode) {
    console.log("actionSetNightMode");
    appState.nightMode = isNightMode;
    (0, react_ivity_1.notifySubscribers)("nightMode");
}
exports.actionSetNightMode = actionSetNightMode;
function actionSetGpsLocation(latLng) {
    console.log("actionSetGpsLocation");
    appState.gps.value = {
        latLng,
        timestamp: new Date().getTime(),
    };
    (0, react_ivity_1.notifySubscribers)("gpsLocation");
    (0, react_ivity_1.notifySubscribers)("gps");
}
exports.actionSetGpsLocation = actionSetGpsLocation;
function actionSetGpsAllowed(value) {
    appState.gps.allowed = value;
    (0, react_ivity_1.notifySubscribers)("gps");
}
exports.actionSetGpsAllowed = actionSetGpsAllowed;
function actionSetGpsEnabled(value) {
    appState.gps.enabled = value;
    (0, react_ivity_1.notifySubscribers)("gps");
}
exports.actionSetGpsEnabled = actionSetGpsEnabled;
function actionSetHasServerConnection(value) {
    appState.hasServerConnection = value;
    (0, react_ivity_1.notifySubscribers)("hasServerConnection");
}
exports.actionSetHasServerConnection = actionSetHasServerConnection;
window.BubblesApp = {
    gps: appState.gps,
};
