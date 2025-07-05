import type { Invoice } from './CryptoPayDto.js';

export interface WebhookUpdate {
    update_id: number;
    update_type: string;
    request_date: string;
    payload: Invoice;
}
