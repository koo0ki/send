# Webhook

Класс для работы с вебхуками CryptoPay API.

## Конструктор

```typescript
new Webhook(token: string, port: number = 8080)
```

- `token`: Токен вашего бота
- `port`: Порт для запуска сервера (по умолчанию 8080)

## Методы

### start()
Запускает веб-сервер для обработки обновлений.

```typescript
await webhook.start()
```

### on(event: "update", listener: (update: WebhookUpdate) => void)
Регистрирует обработчик для событий обновления.

```typescript
webhook.on("update", (update) => {
    console.log(update);
});
```

## Пример использования

```typescript
const webhook = new Webhook("YOUR_BOT_TOKEN", 8080);

webhook.on("update", (update) => {
    console.log(update);
});

await webhook.start();
```

## События

- `update`: Вызывается при получении обновления от CryptoPay API
  - Параметр: `update: WebhookUpdate` - объект обновления
