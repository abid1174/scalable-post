import kafkaConfig from "../config/kafka.config.ts";

export const initiateKafka = async () => {
    try {
        await kafkaConfig.connect();
        await kafkaConfig.createTopic('post');
    } catch (error) {
        console.log('Error initializing kafka service: ', error);
        Deno.exit(1)
    }
}