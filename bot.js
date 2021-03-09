require('dotenv').config();
const { Telegraf } = require('telegraf');
const api = require('covid19-api');
// const markUp = require('telegraf/markup');

const bot = new Telegraf(process.env.BOT_Token);
bot.start((ctx) =>
  ctx.reply(
    `Hello ${ctx.message.from.first_name}!
    Find out covid-19 statistics
    Write the name of the country
    `
  )
);

bot.on('text', async (ctx) => {
  let data = {};
  try {
    data = await api.getReportsByCountries(ctx.message.text);
    const formatData = `
  Country: ${data[0][0].country}
 Cases: ${data[0][0].cases}
 Deaths: ${data[0][0].deaths}
 Recovered: ${data[0][0].recovered}

  `;
    ctx.reply(formatData);
  } catch {
    ctx.reply('Eroorr, there is no such country');
  }
});
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
