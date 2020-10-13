export class IntegrationEvent
{
    private _messageId: string;
    private _sourceAggregateId: string;
    private _type: string;
    private _payload: any;
    private _created: Date;

    constructor(messageId: string, sourceAggregateId: string, type: string, payload: any, created: Date)
    {
        this._messageId = messageId;
        this._sourceAggregateId = sourceAggregateId;
        this._type = type;
        this._payload = payload;
        this._created = created;
    }

    get payload(): any
    {
        return this._payload;
    }
    
    get messageId(): string
    {
        return this._messageId;
    }
    
    get sourceAggregateId(): string
    {
        return this._sourceAggregateId;
    }
    
    get type(): string
    {
        return this._type;
    }
    
    get created(): Date
    {
        return this._created;
    }
}