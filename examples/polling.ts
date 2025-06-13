import { Bot, InlineKeyboard, Keyboard } from 'grammy';
import { CryptoPayClient, Networks } from '../src';

const bot = new Bot(Bun.env.BOT_TOKEN!);
const cryptoPay = new CryptoPayClient({
    token: Bun.env.CRYPTO_PAY_TOKEN!,
    net: Networks.TESTNET,
    pollingEnabled: true,
    pollingInterval: 5000
});

bot.command('start', ctx => {
    ctx.reply('Hello from donate bot', {
        reply_markup: new Keyboard().text('Donate').resized()
    });
});

bot.hears('Donate', async ctx => {
    const invoice = await cryptoPay.createInvoice({
        amount: '10',
        currency_type: 'crypto',
        asset: 'USDT'
    });

    cryptoPay.polling.add({
        result: invoice.result!,
        userId: ctx.from!.id.toString(),
        endTimestamp: Date.now() + 60000 * 10
    });

    ctx.reply('Pay 10$', {
        reply_markup: new InlineKeyboard().url('Pay', invoice.result?.bot_invoice_url!)
    });
});

cryptoPay.polling.on('invoicePaid', async invoice => {
    bot.api.sendMessage(invoice.userId, `your donate ${invoice.result.amount} has been received`).catch(() => {});
});

bot.start();
await bot.init();
console.log(`${new Date().toISOString()} - ${bot.botInfo.username} started`);
