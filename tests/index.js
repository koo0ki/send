import { CryptoPayClient, Networks } from '../dist';

const token = '41570:...';

// CryptoPay initialize

const cryptoPay = new CryptoPayClient({
    token,
    net: Networks.TESTNET,
    pollingEnabled: true,
    pollingInterval: 5000
});

// Example method

const invoice = await cryptoPay.createInvoice({
    amount: 1,
    asset: 'USDT',
    description: 'Test invoice',
    swap_to: 'BTC'
});

console.log(invoice);

// Polling

cryptoPay.polling.add({
    endTimestamp: Date.now() + 60000 * 10,
    result: invoice.result,
    userId: '123'
});

cryptoPay.polling.on('invoicePaid', invoice => {
    console.log(invoice);
});
