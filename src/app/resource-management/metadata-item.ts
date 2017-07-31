export class MetadataItem {
    "compute": {
        "location": string;
        "name": string;
        "offer": string;
        "osType": string;
        "platformFaultDomain": string;
        "platformUpdateDomain": string;
        "publisher": string;
        "sku": string;
        "version": string;
        "vmId": string;
        "vmSize": string
    };
    "network": {
        "interface": {
            "ipv4": {
                "ipAddress": {
                    "privateIpAddress": string;
                    "publicIpAddress": string
                }[],
                "subnet": {
                    "address": string;
                    "prefix": string
                }[]
            },
            "ipv6": { "ipAddress": string }[],
            "macAddress": string
        }[]
    }

}