import { Client, GatewayIntentBits, REST } from 'discord.js';
import { discordToken } from '../config/env';

export const DiscordClientService = new Client({
  intents: [GatewayIntentBits.Guilds],
});

export const DiscordRestService = new REST({ version: '10' }).setToken(
  discordToken,
);
