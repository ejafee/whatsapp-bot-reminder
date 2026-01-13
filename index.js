const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const chrono = require('chrono-node');

// --- 1. SETUP THE BOT ---
const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Scan the QR code above with your WhatsApp!');
});

client.on('ready', () => {
    console.log('Bot is ready!');
});

// --- 2. THE BRAIN (LOGIC) ---
client.on('message', async (message) => {
    const msg = message.body;

    // Check if the message starts with "!remind"
    if (msg.toLowerCase().startsWith('!remind')) {
        
        // A. Parse the time from the message
        const results = chrono.parse(msg);

        if (results.length === 0) {
            return message.reply("I couldn't find a time! Try: '!remind me in 10 seconds to check the stove'");
        }

        const dueTime = results[0].start.date();
        const now = new Date();
        const timeDiff = dueTime - now;

        // B. Safety Check: Is the time in the past?
        if (timeDiff <= 0) {
            return message.reply("That time has already passed! Try a future time.");
        }

        // C. Extract ONLY the task text
        const matchedText = results[0].text; 
        
        // Remove the command and the date text
        let task = msg.replace('!remind', '')
                      .replace(matchedText, '');

        // Clean up extra words like "me" or "to"
        task = task.replace(/\b(me|to)\b/g, '').trim(); 
        
        // Default text if empty
        if (task.length === 0) {
            task = "do something (you didn't say what!)";
        }

        // D. Send confirmation
        await message.reply(`Okay! I'll remind you to *"${task}"* at ${dueTime.toLocaleTimeString()}`);

        // E. Set the Timer
        setTimeout(async () => {
            const chat = await message.getChat();
            
            // Send the clean reminder
            await chat.sendMessage(`⏰ REMINDER: ${task}`);
            
        }, timeDiff);
    }
});

// --- 3. START THE BOT ---
client.initialize();