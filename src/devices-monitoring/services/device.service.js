import http from "../../shared/services/http-common.js";

export class DeviceService {
    resourceEndPoint = '/devices';

    getDeviceById(deviceId) {
        return http.get(`${this.resourceEndPoint}/${deviceId}`);
    }

    updateDeviceMacAddress(deviceId, macAddress) {
        console.log(`${this.resourceEndPoint}/${deviceId}?macAddress=${macAddress}`);
        return http.patch(`${this.resourceEndPoint}/${deviceId}?macAddress=${macAddress}`);
    }

    getDevicesByEdgeServerId(edgeServerId) {
        return http.get(`${this.resourceEndPoint}/edge-server/${edgeServerId}`);
    }
}