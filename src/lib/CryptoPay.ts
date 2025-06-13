import type {
    CryptoPayClientParams,
    ApiResponse,
    App,
    AppStats,
    Balance,
    Check,
    Checks,
    CreateCheckParams,
    CreateInvoiceParams,
    Currency,
    ExchangeRate,
    GetChecksParams,
    GetInvoicesParams,
    GetStatsParams,
    GetTransfersParams,
    Invoice,
    Invoices,
    Transfer,
    TransferParams
} from '../dto/CryptoPayDto';
import { Polling } from './Polling';
import axios, { AxiosInstance } from 'axios';

export default class CryptoPayClient {
    private mainURL: string;
    private testURL: string;
    private URL: string;
    public polling: Polling;
    private instance: AxiosInstance;

    constructor(private client: CryptoPayClientParams) {
        this.mainURL = 'https://pay.crypt.bot/api/';
        this.testURL = 'https://testnet-pay.crypt.bot/api/';
        this.URL = this.client.net === 'testnet' ? this.testURL : this.mainURL;
        this.instance = axios.create({
            baseURL: this.URL,
            headers: {
                'Crypto-Pay-API-Token': this.client.token
            }
        });

        this.polling = new Polling({
            cp: this,
            pollingEnabled: this.client.pollingEnabled,
            pollingInterval: this.client.pollingInterval
        });
    }

    private async fetchAPI<T>(
        url: string,
        params?: Record<string, any>,
        method: 'GET' | 'POST' = 'GET'
    ): Promise<ApiResponse<T>> {
        try {
            const queryString = params && method === 'GET' ? '?' + new URLSearchParams(params).toString() : '';

            const options: any = {
                method,
                headers: {
                    'Crypto-Pay-API-Token': this.client.token
                }
            };

            if (params && method === 'POST') {
                options.headers['Content-Type'] = 'application/json';
                options.body = JSON.stringify(params);
            }

            const response = await this.instance.request<T>({
                url: `${this.URL}${url}${queryString}`,
                method,
                headers: options.headers,
                data: options.body
            });
            const data = response.data as ApiResponse<T>;

            return data;
        } catch (e) {
            throw new Error(`Failed to fetch API: ${e}`);
        }
    }

    async getMe(): Promise<ApiResponse<App>> {
        return this.fetchAPI<App>('getMe');
    }

    async getBalance(): Promise<ApiResponse<Balance[]>> {
        return this.fetchAPI<Balance[]>('getBalance');
    }

    async createInvoice(params: CreateInvoiceParams): Promise<ApiResponse<Invoice>> {
        return this.fetchAPI<Invoice>('createInvoice', params, 'POST');
    }

    async deleteInvoice(invoice_id: number): Promise<ApiResponse<boolean>> {
        return this.fetchAPI<boolean>('deleteInvoice', { invoice_id });
    }

    async createCheck(params: CreateCheckParams): Promise<ApiResponse<Check>> {
        return this.fetchAPI<Check>('createCheck', params, 'POST');
    }

    async deleteCheck(check_id: number): Promise<ApiResponse<boolean>> {
        return this.fetchAPI<boolean>('deleteCheck', { check_id });
    }

    async transfer(params: TransferParams): Promise<ApiResponse<Transfer>> {
        return this.fetchAPI<Transfer>('transfer', params, 'POST');
    }

    async getInvoices(params?: GetInvoicesParams): Promise<ApiResponse<Invoices>> {
        return this.fetchAPI<Invoices>('getInvoices', params);
    }

    async getChecks(params?: GetChecksParams): Promise<ApiResponse<Checks>> {
        return this.fetchAPI<Checks>('getChecks', params);
    }

    async getTransfers(params?: GetTransfersParams): Promise<ApiResponse<Transfer[]>> {
        return this.fetchAPI<Transfer[]>('getTransfers', params);
    }

    async getExchangeRates(): Promise<ApiResponse<ExchangeRate[]>> {
        return this.fetchAPI<ExchangeRate[]>('getExchangeRates');
    }

    async getCurrencies(): Promise<ApiResponse<Currency[]>> {
        return this.fetchAPI<Currency[]>('getCurrencies');
    }

    async getStats(params?: GetStatsParams): Promise<ApiResponse<AppStats>> {
        return this.fetchAPI<AppStats>('getStats', params);
    }
}
