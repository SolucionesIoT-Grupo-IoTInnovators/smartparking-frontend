export class EdgeServer {
    constructor({
        id = 0,
        serverId = '',
        apiKey = '',
        name = '',
        ipAddress = '',
        status = '',
        lastHeartbeat = '',
        connectedDevicesCount = 0,
        parkingId = 0
                }) {
        this.id = id;
        this.serverId = serverId;
        this.apiKey = apiKey;
        this.name = name;
        this.ipAddress = ipAddress;
        this.status = status;
        this.lastHeartbeat = lastHeartbeat;
        this.connectedDevicesCount = connectedDevicesCount;
        this.parkingId = parkingId;
    }
}