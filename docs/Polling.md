# Polling

Класс для работы с опросным оповещением CryptoPay API.

## Конструктор

```typescript
new Polling({
    cp: CryptoPayClient;
    pollingEnabled: boolean;
    pollingInterval: number;
})
```

## Методы

### add(params: PollingParams)
Добавляет новый опрос.
```typescript
interface PollingParams {
    endTimestamp: number; // Время окончания опроса
    invoice: Invoice; // Инвойс
    userId: string; // ID пользователя
}
```

### on(event: "invoicePaid", listener: (invoice: Invoice) => void)
Регистрирует обработчик для событий оплаты инвойса.
```typescript
polling.on("invoicePaid", (invoice) => {
    console.log(invoice);
});
```
