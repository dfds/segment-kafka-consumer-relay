import axios from "axios";

export class ApiClient
{
    private uri: string;

    constructor(uri: string)
    {
        this.uri = uri;
    }

    async post(data:any)
    {
        await axios.post(this.uri, data);
    }
}

