import { Bot, InlineKeyboard, Keyboard } from 'grammy';
import { CryptoPayClient, Networks, Webhook } from '../src';

const bot = new Bot(Bun.env.BOT_TOKEN!);
const cryptoPay = new CryptoPayClient({
    token: Bun.env.CRYPTO_PAY_TOKEN!,
    net: Networks.TESTNET
});

const webhook = new Webhook(Bun.env.CRYPTO_PAY_TOKEN!);

bot.command('start', ctx => {
    ctx.reply('Hello from donate bot', {
        reply_markup: new Keyboard().text('Donate').resized()
    });
});

bot.hears('Donate', async ctx => {
    const invoice = await cryptoPay.createInvoice({
        amount: '10',
        currency_type: 'crypto',
        asset: 'USDT',
        payload: ctx.from!.id.toString()
    });

    ctx.reply('Pay 10$', {
        reply_markup: new InlineKeyboard().url('Pay', invoice.result?.bot_invoice_url!)
    });
});

webhook.on('update', async update => {
    bot.api
        .sendMessage(String(update.payload?.payload), `your donate ${update.payload.amount} has been received`)
        .catch(() => {});
});

webhook.start();
bot.start();
await bot.init();
console.log(`${new Date().toISOString()} - ${bot.botInfo.username} started`);
