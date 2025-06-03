import type { Invoice } from "./CryptoPayDto";
import type CryptoPayManager from "../lib/CryptoPay";

export interface PollingParams {
    cp: CryptoPayManager;
    pollingEnabled: boolean;
    pollingInterval: number;
}

export interface Invoices {
    result: Invoice;
    userId: string;
    endTimestamp: number;
}
