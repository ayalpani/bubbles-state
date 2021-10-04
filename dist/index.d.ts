export declare type LatLng = {
    latitude: number;
    longitude: number;
};
export declare type GpsState = {
    value?: {
        latLng: LatLng;
        timestamp: number;
    };
    enabled?: boolean;
    allowed?: boolean;
};
export declare type AppState = {
    nightMode: boolean;
    gps: GpsState;
    hasServerConnection: boolean;
    auth?: {
        userId: string;
    };
};
export declare function useSubscribeNightMode(): boolean;
export declare function useSubscribeAuthUserId(): string | undefined;
export declare function useSubscribeGps(): GpsState;
export declare function useSubscribeHasServerConnection(): boolean;
export declare function actionLogMeIn(userId: string): void;
export declare function actionLogMeOut(): void;
export declare function actionSetNightMode(isNightMode: boolean): void;
export declare function actionSetGpsLocation(latLng: LatLng): void;
export declare function actionSetGpsAllowed(value: boolean): void;
export declare function actionSetGpsEnabled(value: boolean): void;
export declare function actionSetHasServerConnection(value: boolean): void;
declare global {
    interface Window {
        BubblesApp: {
            gps: GpsState;
        };
    }
}
