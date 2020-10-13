import { IntegrationEvent } from "../events/events";

export class JsonToEventMapper
{
    static map(payload: any) : IntegrationEvent | null
    {
        let result: IntegrationEvent | null = null;

        if(payload && payload.messageId && payload.sourceAggregateId && payload.type && payload.data && payload.created)
        {
            result = new IntegrationEvent(payload.messageId, payload.sourceAggregateId, payload.type, payload.data, payload.created);
        }

        return result;
    }
}