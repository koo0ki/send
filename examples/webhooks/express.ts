import express from 'express';
import { CryptoPayClient, Networks } from '../../src';

const cryptoPay = new CryptoPayClient({
    token: Bun.env.CRYPTO_PAY_TOKEN!,
    net: Networks.TESTNET
});

const app = express();

app.use(express.json());

app.post('/', async (req, res) => {
    const response = cryptoPay.webhook.handleWebhook({
        body: req.body,
        headers: req.headers
    });

    res.json(response).status(200);
});

cryptoPay.webhook.on('update', async invoice => {
    console.log('Invoice updated:', invoice);
});

app.listen({ port: 3000 }, () => {
    console.log('Server is running on port 3000');
});
