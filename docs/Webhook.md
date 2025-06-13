# Webhook

Класс для работы с вебхуками CryptoPay API.

## Пример использования

```typescript
import fastify from 'fastify';
import { CryptoPayClient, Networks } from '@koo0ki/send';

const cryptoPay = new CryptoPayClient({
    token: Bun.env.CRYPTO_PAY_TOKEN!,
    net: Networks.TESTNET
});

const app = fastify();

app.post('/', async (req, res) => {
    return cryptoPay.webhook.handleWebhook({
        body: req.body,
        headers: req.headers
    });
});

cryptoPay.webhook.on('update', async invoice => {
    console.log('Invoice updated:', invoice);
});

app.listen({ port: 3000 }, () => {
    console.log('Server is running on port 3000');
});
```

## События

- `update`: Вызывается при получении обновления от CryptoPay API
  - Параметр: `update: WebhookUpdate` - объект обновления
