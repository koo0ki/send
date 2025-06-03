import { createHash, createHmac } from "crypto";
import { EventEmitter } from "events";
import fastify, { FastifyInstance } from "fastify";
import { IncomingHttpHeaders } from "http";
import { WebhookUpdate } from "../dto/WebhookDto";

export default class Webhook extends EventEmitter {
    private server: FastifyInstance;
    private token: string;
    private port: number;
    constructor(token: string, port: number = 8080) {
        super();
        this.token = token;
        this.port = port;
        this.server = fastify({
            logger: false
        });
    }

    public async start() {
        this.server.post("/", async (req) => {
            try {
                if (
                    !this.checkSignature(this.token, {
                        body: req.body,
                        headers: req.headers,
                    })
                ) {
                    return;
                }

                this.emit("update", req.body);

                return { ok: true };
            } catch (e) {
                throw e;
            }
        });

        await this.server.listen({ port: this.port }).catch((e) => {
            throw e;
        });
    }

    private checkSignature(
        token: string,
        { body, headers }: { body: any; headers: IncomingHttpHeaders }
    ) {
        const signature = headers["crypto-pay-api-signature"];
        if (!signature) {
            return false;
        }

        const secret = createHash("sha256").update(token).digest();

        const hmac = createHmac("sha256", secret)
            .update(JSON.stringify(body))
            .digest("hex");

        return hmac === signature;
    }

    on(event: "update", listener: (update: WebhookUpdate) => void): this;
    on(event: string, listener: (...args: any[]) => void): this;
    on(event: string, listener: (...args: any[]) => void): this {
        return super.on(event, listener);
    }
}
