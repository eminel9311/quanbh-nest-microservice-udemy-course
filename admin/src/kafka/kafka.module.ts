import { forwardRef, Module } from "@nestjs/common";
import { KafkaService } from "./kafka.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { KafkaController } from "./kafka.controller";
import { LinkModule } from "../link/link.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { KafkaError } from "./kafka-error";
import { OrderModule } from "../order/order.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([KafkaError]),
    ClientsModule.register([
      {
        name: "KAFKA_SERVICE",
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ["pkc-4ygn6.europe-west3.gcp.confluent.cloud:9092"],
            ssl: true,
            sasl: {
              mechanism: "plain",
              username: "6567MKPS6YFGEMJH",
              password: "zaf8YnUY/BzmTpNk6TFC+wJQQ0YoQdvmwfRQTRtRo19YZChYEev2Wkx+rG3Two2h"
            }
          }
        }
      }
    ]),
    forwardRef(() => LinkModule),
    forwardRef(() => OrderModule)
  ],
  providers: [KafkaService],
  exports: [KafkaService],
  controllers: [KafkaController]
})
export class KafkaModule {
}
