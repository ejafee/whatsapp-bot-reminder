# WhatsApp Reminder Bot

reminder  **Node.js** and **whatsapp-web.js**. 

Before running this project, make sure you have:
1.  **Node.js** installed (LTS version).
2.  A **WhatsApp** account on your phone.

## Installation

1.  **Install dependencies**:
    This downloads `whatsapp-web.js`, `qrcode-terminal`, and `chrono-node`.
    ```bash
    npm install
    ```

## How to Run

1.  **Start the bot**:
    ```bash
    node index.js
    ```

2.  
    - The terminal will generate a QR code.
    - Open WhatsApp on your phone -> **Settings** -> **Linked Devices** -> **Link a Device**.
    - Scan the code on your screen.

3.  Once you see `Bot is ready!`, you can start sending commands.

## 📝 Commands

| Command | Example | Description |
| :--- | :--- | :--- |
| **!remind** | `!remind me in 10 mins to drink water` | Sets a reminder. The bot will tag you when the time is up. |
| **!remind** | `!remind call mom tomorrow at 9am` | Works with specific dates and times too. |

## Troubleshooting

**Windows PowerShell Error:**
If you see an error saying `running scripts is disabled on this system`, run this command in PowerShell as Administrator:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser