# @koo0ki/send

Клиентская библиотека для работы с CryptoPay API на TypeScript/JavaScript.

## Установка

```bash
npm install @koo0ki/send
```

## Быстрый старт

```javascript
import { CryptoPayClient, Networks } from "@koo0ki/send";

// Инициализация клиента
const cryptoPay = new CryptoPayClient({
    token: "YOUR_API_TOKEN",
    net: Networks.TESTNET, // или Networks.MAINNET для основной сети
    pollingEnabled: true,
    pollingInterval: 15000,
});

// Создание инвойса
const invoice = await cryptoPay.createInvoice({
    amount: 1,
    asset: "USDT",
    description: "Test invoice",
});
```

## Основные возможности

- Создание и управление инвойсами
- Поддержка вебхуков для получения обновлений
- Автоматическое опросное оповещение (polling)
- Работа с тестовой и основной сетью
- Полная поддержка TypeScript

## Документация

Подробная документация доступна в [документации](https://github.com/koo0ki/send/tree/main/docs).

### Основные компоненты

- [CryptoPayClient](https://github.com/koo0ki/send/tree/main/docs/CryptoPayClient.md)
- [Webhook](https://github.com/koo0ki/send/tree/main/docs/Webhook.md)
- [Polling](https://github.com/koo0ki/send/tree/main/docs/Polling.md)

## Лицензия

MIT
