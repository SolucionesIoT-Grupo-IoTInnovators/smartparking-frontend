export class Device {
    constructor({
        id = 0,
        macAddress = '',
        type = '',
        operationStatus = '',
        spotStatus = '',
        spotLabel = '',
        parkingSpotId = '',
        parkingId = 0,
        edgeServerId = 0,
        lastCommunication = '',
                }) {
        this.id = id;
        this.macAddress = macAddress;
        this.type = type;
        this.operationStatus = operationStatus;
        this.spotStatus = spotStatus;
        this.spotLabel = spotLabel;
        this.parkingSpotId = parkingSpotId;
        this.parkingId = parkingId;
        this.edgeServerId = edgeServerId;
        this.lastCommunication = lastCommunication;
    }
}