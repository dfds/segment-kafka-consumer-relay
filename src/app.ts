import dotenv from "dotenv";
import { ConsumerRelay, ConsumerRelayConfig } from "./kafka/consumerRelay";

dotenv.config();

const config: ConsumerRelayConfig = {
  segmentApiUri: 'https://fn.segmentapis.com/?b=dkNyeDRldEw2YTc4ZTRHZjNqdWpnVTo6SUd4MHNrdERyUGdGVVN1cmZHakQ1MDdnYzh6ZjZITXM=',
  clientId: 'segment-kafka-consumer-relay',
  brokers: ['pkc-e8wrm.eu-central-1.aws.confluent.cloud:9092'],
  ssl: true,
  sasl: {
    mechanism: 'plain', // scram-sha-256 or scram-sha-512
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD
  },
  groupId: 'segment-ui-beorp-segment-kafka-consumer-relay'
};

const relay: ConsumerRelay = new ConsumerRelay(config);

relay.connect('pub.paxeventintegration-lgyny.segmentpoc', false); // true will fetch events from the root