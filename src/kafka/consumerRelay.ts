import { Kafka, KafkaConfig, Consumer, ConsumerConfig } from "kafkajs";
import { ApiClient } from "../segment/apiClient"
import { JsonToEventMapper } from "../mapping/jsonToEventMapper"

export type ConsumerRelayConfig = { segmentApiUri: string } & KafkaConfig & ConsumerConfig;

export class ConsumerRelay
{
    private kafka: Kafka;
    private consumer: Consumer;
    private segmentClient: ApiClient;

    constructor(config: ConsumerRelayConfig)
    {
        this.kafka = new Kafka(config);
        this.consumer = this.kafka.consumer(config);
        this.segmentClient = new ApiClient(config.segmentApiUri);
    }

    async connect(topic: string, fromBeginning: boolean = true){        
        await this.consumer.connect();
        await this.consumer.subscribe({ topic: topic, fromBeginning: fromBeginning });

        await this.consumer.run({
            eachMessage: async ({ message }) => {
                if(message)
                {
                    if(message.value)
                    {                        
                        const payload = JSON.parse(message.value.toString());
                        const event = JsonToEventMapper.map(payload);

                        if(event)
                        {
                            if(event.type.indexOf("SegmentPocReservationUpdated") > -1)
                            {
                                await this.segmentClient.post(event);

                                console.log("Posted SegmentPocReservationUpdated event to Segment FaaS endpoint", event);
                            }
                        }
                    }
                }
            },
        })
    }

    async disconnect(){
        await this.consumer.disconnect();
    }
}