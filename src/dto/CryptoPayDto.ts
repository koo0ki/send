export interface CryptoPayClientParams {
    token: string;
    net: 'main' | 'testnet';
    pollingEnabled?: boolean;
    pollingInterval?: number;
}

export interface ApiResponse<T> {
    ok: boolean;
    result?: T;
    error?: string;
}

export interface App {
    app_id: number;
    name: string;
    payment_processing_bot_username: string;
}

export type CryptoCurrencyCode =
    | 'USDT'
    | 'TON'
    | 'GRAM'
    | 'NOT'
    | 'MY'
    | 'DOGS'
    | 'BTC'
    | 'LTC'
    | 'ETH'
    | 'BNB'
    | 'TRX'
    | 'WIF'
    | 'USDC'
    | 'TRUMP'
    | 'MELANIA'
    | 'SOL'
    | 'DOGE'
    | 'PEPE'
    | 'BONK'
    | 'MAJOR'
    | 'HMSTR'
    | 'CATI'
    | 'MEMHASH';

export type FiatCurrencyCode =
    | 'USD'
    | 'EUR'
    | 'RUB'
    | 'BYN'
    | 'UAH'
    | 'GBP'
    | 'CNY'
    | 'KZT'
    | 'UZS'
    | 'GEL'
    | 'TRY'
    | 'AMD'
    | 'THB'
    | 'INR'
    | 'BRL'
    | 'IDR'
    | 'AZN'
    | 'AED'
    | 'PLN'
    | 'ILS'
    | 'KGS'
    | 'TJS';

export interface Invoice {
    invoice_id: number;
    hash: string;
    currency_type: 'crypto' | 'fiat';
    asset?: CryptoCurrencyCode;
    fiat?: FiatCurrencyCode;
    amount: string;
    paid_asset?: CryptoCurrencyCode;
    paid_amount?: string;
    paid_fiat_rate?: string;
    accepted_assets?: string;
    fee_asset?: string;
    fee_amount?: number;
    bot_invoice_url: string;
    mini_app_invoice_url: string;
    web_app_invoice_url: string;
    description?: string;
    status: 'active' | 'paid' | 'expired';
    created_at: string;
    paid_usd_rate?: string;
    allow_comments: boolean;
    allow_anonymous: boolean;
    expiration_date?: string;
    paid_at?: string;
    paid_anonymously?: boolean;
    comment?: string;
    hidden_message?: string;
    payload?: string;
    paid_btn_name?: 'viewItem' | 'openChannel' | 'openBot' | 'callback';
    paid_btn_url?: string;
}

export interface Transfer {
    transfer_id: number;
    spend_id: string;
    user_id: number;
    asset: CryptoCurrencyCode;
    amount: string;
    status: 'completed';
    completed_at: string;
    comment?: string;
}

export interface Check {
    check_id: number;
    hash: string;
    asset: CryptoCurrencyCode;
    amount: string;
    bot_check_url: string;
    status: 'active' | 'activated';
    created_at: string;
    activated_at?: string;
}

export interface Balance {
    currency_code: string;
    available: string;
    onhold: string;
}

export interface ExchangeRate {
    is_valid: boolean;
    is_crypto: boolean;
    is_fiat: boolean;
    source: string;
    target: string;
    rate: string;
}

export interface AppStats {
    volume: number;
    conversion: number;
    unique_users_count: number;
    created_invoice_count: number;
    paid_invoice_count: number;
    start_at: string;
    end_at: string;
}

export interface Currency {
    is_blockchain: boolean;
    is_stablecoin: boolean;
    is_fiat: boolean;
    name: string;
    code: string;
    decimals: number;
    url?: string;
}

export interface CreateInvoiceParams {
    currency_type?: 'crypto' | 'fiat';
    asset?: CryptoCurrencyCode;
    fiat?: FiatCurrencyCode;
    accepted_assets?: string;
    amount: string;
    description?: string;
    hidden_message?: string;
    paid_btn_name?: 'viewItem' | 'openChannel' | 'openBot' | 'callback';
    paid_btn_url?: string;
    payload?: string;
    allow_comments?: boolean;
    allow_anonymous?: boolean;
    expires_in?: number;
}

export interface CreateCheckParams {
    asset: CryptoCurrencyCode;
    amount: string;
    pin_to_user_id?: number;
    pin_to_username?: string;
}

export interface TransferParams {
    user_id: number;
    asset: CryptoCurrencyCode;
    amount: string;
    spend_id: string;
    comment?: string;
    disable_send_notification?: boolean;
}

export interface GetInvoicesParams {
    asset?: CryptoCurrencyCode;
    fiat?: FiatCurrencyCode;
    invoice_ids?: string;
    status?: 'active' | 'paid';
    offset?: number;
    count?: number;
}

export interface GetChecksParams {
    asset?: CryptoCurrencyCode;
    check_ids?: string;
    status?: 'active' | 'activated';
    offset?: number;
    count?: number;
}

export interface GetTransfersParams {
    asset?: CryptoCurrencyCode;
    transfer_ids?: string;
    spend_id?: string;
    offset?: number;
    count?: number;
}

export interface GetStatsParams {
    start_at?: string;
    end_at?: string;
}

export interface Invoices {
    items: Invoice[];
}

export interface Checks {
    items: Check[];
}
