import type { Invoice } from './CryptoPayDto.js';
import type CryptoPayManager from '../lib/CryptoPay.js';

export interface PollingParams {
    cp: CryptoPayManager;
    pollingEnabled?: boolean;
    pollingInterval?: number;
}

export interface Invoices {
    result: Invoice;
    userId: string;
    endTimestamp: number;
}
