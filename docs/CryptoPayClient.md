# CryptoPayClient

Клиент для работы с API CryptoPay.

## Конструктор

```typescript
new CryptoPayClient({
    token: string;           // Ваш токен API
    net: "main" | "testnet"; // Сеть для работы
    pollingEnabled: boolean; // Включить опросное оповещение
    pollingInterval: number; // Интервал опроса в миллисекундах
})
```

## Методы

### Инвойсы

#### createInvoice(params: CreateInvoiceParams)
Создает новый инвойс.
```typescript
interface CreateInvoiceParams {
    currency_type?: "crypto" | "fiat"; // Тип валюты
    asset?: CryptoCurrencyCode;         // Криптовалюта
    fiat?: FiatCurrencyCode;            // Фиатная валюта
    accepted_assets?: string;           // Принимаемые валюты
    amount: string;                     // Сумма
    description?: string;               // Описание
    hidden_message?: string;            // Скрытое сообщение
    paid_btn_name?: "viewItem" | "openChannel" | "openBot" | "callback"; // Действие после оплаты
    paid_btn_url?: string;              // URL для действия
    payload?: string;                   // Дополнительные данные
    allow_comments?: boolean;           // Разрешить комментарии
    allow_anonymous?: boolean;          // Разрешить анонимные платежи
    expires_in?: number;                // Время жизни в секундах
}
```

#### getInvoices(params?: GetInvoicesParams)
Получает список инвойсов.
```typescript
interface GetInvoicesParams {
    asset?: CryptoCurrencyCode;         // Фильтр по валюте
    fiat?: FiatCurrencyCode;            // Фильтр по фиату
    invoice_ids?: string;               // ID инвойсов
    status?: "active" | "paid";        // Статус
    offset?: number;                    // Смещение
    count?: number;                     // Количество
}
```

#### deleteInvoice(invoice_id: number)
Удаляет инвойс.

### Чеки

#### createCheck(params: CreateCheckParams)
Создает новый чек.
```typescript
interface CreateCheckParams {
    asset: CryptoCurrencyCode;          // Валюта
    amount: string;                     // Сумма
    pin_to_user_id?: number;            // ID пользователя
    pin_to_username?: string;           // Username пользователя
}
```

#### getChecks(params?: GetChecksParams)
Получает список чеков.
```typescript
interface GetChecksParams {
    asset?: CryptoCurrencyCode;         // Фильтр по валюте
    check_ids?: string;                 // ID чеков
    status?: "active" | "activated";   // Статус
    offset?: number;                    // Смещение
    count?: number;                     // Количество
}
```

#### deleteCheck(check_id: number)
Удаляет чек.

### Трансферы

#### transfer(params: TransferParams)
Переводит средства между пользователями.
```typescript
interface TransferParams {
    user_id: number;                    // ID получателя
    asset: CryptoCurrencyCode;          // Валюта
    amount: string;                     // Сумма
    spend_id: string;                   // Уникальный ID транзакции
    comment?: string;                   // Комментарий
    disable_send_notification?: boolean; // Отключить уведомление
}
```

#### getTransfers(params?: GetTransfersParams)
Получает список трансферов.
```typescript
interface GetTransfersParams {
    asset?: CryptoCurrencyCode;         // Фильтр по валюте
    transfer_ids?: string;              // ID трансферов
    spend_id?: string;                  // ID транзакции
    offset?: number;                    // Смещение
    count?: number;                     // Количество
}
```

### Информация

#### getMe()
Получает информацию о приложении.

#### getBalance()
Получает баланс.

#### getExchangeRates()
Получает текущие курсы обмена.

#### getCurrencies()
Получает список поддерживаемых валют.

#### getStats(params?: GetStatsParams)
Получает статистику приложения.
```typescript
interface GetStatsParams {
    start_at?: string;                  // Начальная дата
    end_at?: string;                    // Конечная дата
}
```

### Типы валют

#### CryptoCurrencyCode
Поддерживаемые криптовалюты:
- USDT
- TON
- GRAM
- NOT
- MY
- DOGS
- BTC
- LTC
- ETH
- BNB
- TRX
- WIF
- USDC
- TRUMP
- MELANIA
- SOL
- DOGE
- PEPE
- BONK
- MAJOR
- HMSTR
- CATI
- MEMHASH

#### FiatCurrencyCode
Поддерживаемые фиатные валюты:
- USD
- EUR
- RUB
- BYN
- UAH
- GBP
- CNY
- KZT
- UZS
- GEL
- TRY
- AMD
- THB
- INR
- BRL
- IDR
- AZN
- AED
- PLN
- ILS
- KGS
- TJS