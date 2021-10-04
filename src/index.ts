import { notifySubscribers, useSubscribe } from "react-ivity";

//////////////////// Types

export type Todo = {
  id: string;
  title: string;
  isDone: boolean;
};

export type LatLng = {
  latitude: number;
  longitude: number;
};

//////////////////// AppState

export type GpsState = {
  value?: {
    latLng: LatLng;
    timestamp: number;
  };
  enabled?: boolean;
  allowed?: boolean;
};

export type AppState = {
  nightMode: boolean;
  gps: GpsState;
  hasServerConnection: boolean;
  auth?: {
    userId: string;
  };
};

const initialAppState: AppState = {
  nightMode: false,
  hasServerConnection: true,
  gps: {},
};

const appState = initialAppState;

//////////////////// Subscribers

export function useSubscribeNightMode(): boolean {
  useSubscribe("nightMode");
  return appState.nightMode;
}

export function useSubscribeAuthUserId(): string | undefined {
  useSubscribe("authUserId");
  return appState.auth?.userId;
}

export function useSubscribeGps(): GpsState {
  useSubscribe("gps");
  return appState.gps;
}

export function useSubscribeHasServerConnection(): boolean {
  useSubscribe("hasServerConnection");
  return appState.hasServerConnection;
}

//////////////////// Actions

export function actionLogMeIn(userId: string) {
  appState.auth = {
    userId,
  };
  notifySubscribers("authUserId");
}

export function actionLogMeOut() {
  appState.auth = undefined;
  notifySubscribers("authUserId");
}

export function actionSetNightMode(isNightMode: boolean) {
  console.log("actionSetNightMode");
  appState.nightMode = isNightMode;
  notifySubscribers("nightMode");
}

export function actionSetGpsLocation(latLng: LatLng) {
  console.log("actionSetGpsLocation");
  appState.gps.value = {
    latLng,
    timestamp: new Date().getTime(),
  };

  notifySubscribers("gpsLocation");
  notifySubscribers("gps");
}

export function actionSetGpsAllowed(value: boolean) {
  appState.gps.allowed = value;
  notifySubscribers("gps");
}

export function actionSetGpsEnabled(value: boolean) {
  appState.gps.enabled = value;
  notifySubscribers("gps");
}

export function actionSetHasServerConnection(value: boolean) {
  appState.hasServerConnection = value;
  notifySubscribers("hasServerConnection");
}

declare global {
  interface Window {
    MyApp: {
      gps: GpsState;
      useSubscribeNightMode: () => void;
      useSubscribeAuthUserId(): string | undefined;
      useSubscribeGps(): GpsState;
      useSubscribeHasServerConnection(): boolean;

      actionLogMeOut: () => void;
      actionSetNightMode: (isNightMode: boolean) => void;
      actionSetGpsLocation: (latLng: LatLng) => void;
      actionSetGpsAllowed: (value: boolean) => void;
      actionSetGpsEnabled: (value: boolean) => void;
      actionSetHasServerConnection: (value: boolean) => void;
    };
  }
}

window.MyApp = {
  gps: appState.gps,
  useSubscribeNightMode,
  useSubscribeAuthUserId,
  useSubscribeGps,
  useSubscribeHasServerConnection,

  actionLogMeOut,
  actionSetNightMode,
  actionSetGpsLocation,
  actionSetGpsAllowed,
  actionSetGpsEnabled,
  actionSetHasServerConnection,
};
