const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEdId0oySmV3eDBocE15cWtETzhxOURoYStIcit4RXlDS3ZzTnptN2NWWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaG5QV1A1Q1ExMWV2aTFFdytpOWFTRlN4bjlabE5JaWdxTjU0WnpDZ3Iwcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnTlN3WmNKcDRwQzZaeFU1d1N3UWtMckJKbXpOZXJud050dEVyS1FneVZVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQOTRYOGdaSTY2dTdFenAvazU5OXllK2lJR25JNzhOMzFUTiswUkJMOWlZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlOSTdETnY4cHlYcVRYYytMY3FTUDc1dElKMzdKdURDUi9BUmVsVVNIMUE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlUvMXpMYVJjaWFvekRkczBtT3Z4Qk1nVHdFcVRScUtSVlA2Z1NyNExsREk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEp6dHR5TU80ZDh1c2M5ZEhCSHJGQ2EwamgzYVRDb2ZNMEFldWN2dmYyVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0djaG1qQWNVMW1uRW9lUEk3YTJkZmJpNkdnWURkZHg3b2IxR250T1JCaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBvcWEwT2VkSDY5RVhWcUlGRENsMGZFSDZNNWpYSjh3L0ZmY3Q3bXJwVDBIVFROY0FXYXVweWhnNWFPZWNQVHA5bEE4VEVoL0JCZXROZnpVSUppSENRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTczLCJhZHZTZWNyZXRLZXkiOiJsOXBmV3BZUDhZVHNYTS9FV0gyV2x5ZU02L3R0WHIzTjg4RXFWMVRNMzdZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJXeTZRdDkzMFRTT1J5LVROOEpzejFnIiwicGhvbmVJZCI6IjE2ODI4OTUwLTdiZTEtNGY1Ny1hMTAxLWQ1NTQ0MDFjMmQ3MCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzZjBKVkJadnpnbEY0Y3dIZjFZVytqaVFGQm89In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibjFod3BKQ3haZm9pSUN6T2NuNWN6akVQaGpRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlFUVzZKQUdCIiwibWUiOnsiaWQiOiIyMzQ4MTA1MjAyMzkwOjE0QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQS2pwTHdCRUk3Z3Ryb0dHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJySlFlMTEybHJJYTg0NzFmcjc3ajJBck1zN1FjTEY3U1I4QzBJTEJpM0dnPSIsImFjY291bnRTaWduYXR1cmUiOiJXTmJYaC9wR29sYkcrNW9CZldDK0NmS3Z5cEptekFESExrcnJVWlR3WFpVWm8yYlY4YmRTbGJjQTl1ajV4U1hmRHRXcVhNWnRuZ2h2dXFKSFpsZ25DQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiOWlrZVVjam54U0VwS3BXZDlIN1BUODdwOW9sZkFBOW9JcC9LeG5ZRjhFQ3pIbGJkd2k0bnl1NVNsZWdVYXBNcythQzBFT00zZ2lEcjRGc0RWWENJQWc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MTA1MjAyMzkwOjE0QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmF5VUh0ZGRwYXlHdk9POVg2Kys0OWdLekxPMEhDeGUwa2ZBdENDd1l0eG8ifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzMxNDQ2MDQsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQzI5In0=',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "2348105202390", 
    A_REACT : process.env.AUTO_REACTION || 'on',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "off",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
