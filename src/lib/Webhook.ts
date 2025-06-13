import { createHash, createHmac } from 'crypto';
import { EventEmitter } from 'events';
import { IncomingHttpHeaders } from 'http';
import { WebhookUpdate } from '../dto/WebhookDto';

export default class Webhook extends EventEmitter {
    private token: string;
    constructor(token: string) {
        super();
        this.token = token;
    }

    public handleWebhook({ body, headers }: { body: any; headers: IncomingHttpHeaders }) {
        if (
            !this.checkSignature(this.token, {
                body: body,
                headers: headers
            })
        ) {
            return { ok: false };
        }

        this.emit('update', body);

        return { ok: true };
    }

    private checkSignature(token: string, { body, headers }: { body: any; headers: IncomingHttpHeaders }) {
        const signature = headers['crypto-pay-api-signature'];
        if (!signature) {
            return false;
        }

        const secret = createHash('sha256').update(token).digest();

        const hmac = createHmac('sha256', secret).update(JSON.stringify(body)).digest('hex');

        return hmac === signature;
    }

    on(event: 'update', listener: (update: WebhookUpdate) => void): this;
    on(event: string, listener: (...args: any[]) => void): this;
    on(event: string, listener: (...args: any[]) => void): this {
        return super.on(event, listener);
    }
}
