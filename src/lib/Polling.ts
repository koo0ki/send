import type { Invoices, PollingParams } from '../dto/PollingDto.js';
import type { Invoice } from '../dto/CryptoPayDto.js';
import { EventEmitter } from 'events';

export class Polling extends EventEmitter {
    private invoices: Invoices[];
    private interval?: number;

    constructor(private params: PollingParams) {
        super();
        this.params = params;
        this.invoices = [];

        if (this.params.pollingEnabled) {
            this.interval = this.params.pollingInterval || 5000;

            if (this.interval < 5000) throw new Error('Polling interval must be at least 5000ms');

            this.sweeper();
        }
    }

    public add(dto: Invoices) {
        this.invoices.push(dto);
    }

    private async sweeper() {
        setInterval(async () => {
            this.invoices = this.invoices.filter(i => i.endTimestamp > Date.now());

            await this.checkInvoices();
        }, this.interval);
    }

    private async checkInvoices() {
        if (!this.invoices.length) return;

        const response = await this.params.cp.getInvoices();

        for (const invoice of this.invoices) {
            if (response.ok) {
                const inv = (response.result!.items as Invoice[]).find(i => i.invoice_id === invoice.result.invoice_id);

                if (inv?.status == 'paid') {
                    this.emit('invoicePaid', invoice);
                    this.invoices = this.invoices.filter(i => i.result.invoice_id !== invoice.result.invoice_id);
                }
            }
        }
    }

    on(event: 'invoicePaid', listener: (invoice: Invoices) => void): this;
    on(event: string, listener: (...args: any[]) => void): this;
    on(event: string, listener: (...args: any[]) => void): this {
        return super.on(event, listener);
    }
}
