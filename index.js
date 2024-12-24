import TelegramBot from 'node-telegram-bot-api';
import path from 'path';
import fs from 'fs'
import express from 'express';

import { GoogleGenerativeAI } from "@google/generative-ai";

import 'dotenv/config'

import https from 'https';

const app = express();
const port = 3000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEYY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const prompt = "Explain how AI works";

// const result = await model.generateContent(prompt);
// console.log(result.response.text());

const token = process.env.TELEGRAM_TOKEN;



const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {

    bot.sendMessage(msg.chat.id, "Welcome to my bot!");

});

bot.onText(/\/about/, (msg) => {

    bot.sendMessage(msg.chat.id, "This bot is developed by @list_lesss");

});


const splitMessage = (text, maxLength = 4000) => {
    const chunks = [];
    while (text.length > maxLength) {
        let splitIndex = text.lastIndexOf('\n', maxLength); // Try to split at a newline
        if (splitIndex === -1) splitIndex = maxLength; // If no newline, split at maxLength
        chunks.push(text.slice(0, splitIndex));
        text = text.slice(splitIndex);
    }
    chunks.push(text); // Push the remaining text
    return chunks;
};


bot.on('message', async (msg) => {

    bot.sendChatAction(msg.chat.id, 'typing');
    if (msg.text && msg.text.startsWith('/')) return;


    bot.sendChatAction(msg.chat.id, 'typing');
    if (msg.photo) {
        // Get the highest resolution photo (last in the array)
        const fileId = msg.photo[msg.photo.length - 1].file_id;

        try {
            // Fetch file details
            const file = await bot.getFile(fileId);
            const fileUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_TOKEN}/${file.file_path}`;

            // Download and save the file
            const fileName = `downloaded_image_${Date.now()}.jpg`; // Unique name for the file
            const fileStream = fs.createWriteStream(fileName);

            https.get(fileUrl, (response) => {
                response.pipe(fileStream);

                fileStream.on('finish', () => {
                    fileStream.close();
                    console.log(`Image saved as ${fileName}`);
                    bot.sendMessage(msg.chat.id, `Image saved successfully as ${fileName}`);
                });
            });
        } catch (err) {
            console.error('Error downloading the file:', err);
        }
    }

    else {
        if(!msg.text){
            bot.sendMessage(msg.chat.id, 'Please enter some text');
            return
        }
        console.log(msg.text);
        const prompt = msg.text;
        const result = await model.generateContent(prompt);
        //console.log(result.response.text());


       

        //bot.sendMessage(msg.chat.id, result.response.text() );


        // Prepare the AI response
        let responseText = result.response.text();

        // Escape MarkdownV2 special characters
        const escapeMarkdown = (text) => {
            return text.replace(/([_*[\]()~`>#+\-=|{}.!\\])/g, '\\$1');
        };

        // Escape the entire response first
        responseText = escapeMarkdown(responseText);

        // Handle code blocks (```)
        responseText = responseText.replace(/\\`\\`\\`([\s\S]*?)\\`\\`\\`/g, (match, code) => {
            return `\`\`\`\n${code.trim()}\n\`\`\``;
        });

        // Handle inline code (`...`)
        responseText = responseText.replace(/\\`([^`]*)\\`/g, (match, inlineCode) => {
            //return `\`${inlineCode.trim()}\``;
            return `\`\`\`\n${inlineCode.trim()}\n\`\`\``;
        });

        // Split the response into chunks if it's too long
        const messages = splitMessage(responseText);

        // Send the message with MarkdownV2 formatting
        //bot.sendMessage(msg.chat.id, responseText, { parse_mode: 'MarkdownV2' });


        // Send each chunk as a separate message
        for (const chunk of messages) {
            await bot.sendMessage(msg.chat.id, chunk, { parse_mode: 'MarkdownV2' });
        }
    }
    // if (msg.text === '/start') {
    //     bot.sendMessage(msg.chat.id, 'Hello World!');
    // }

    // if(msg.text.indexOf('hi') === 0){
    //     bot.sendMessage(msg.chat.id, 'Hi');
    // }
    // else{
    //     bot.sendMessage(msg.chat.id, 'i dont understand');
    // }

});


app.get('/' , (req , res) => {

    res.sendFile(path.join(__dirname , 'index.html'));
    //res.send('Hello World');
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});







