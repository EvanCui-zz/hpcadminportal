export class ScheduledEventItem {
    "DocumentIncarnation": number;
    "Events": {
        "EventId": string;
        "EventStatus": string;
        "EventType": string;
        "ResourceType": string;
        "Resources": string[],
        "NotBefore": string;
    }[]
}