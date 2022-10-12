import 'dotenv/config';

import { Routes } from 'discord.js';
import { commands, discordAppId, discordToken } from './config';
import { autocompleteHandler, responseHandler } from './handlers';
import {
  DiscordClientService,
  DiscordRestService,
  GasService,
} from './services';

DiscordClientService.once('ready', () => {
  console.log('Gas Bot is online !');
});

DiscordClientService.login(discordToken);

DiscordClientService.on('interactionCreate', autocompleteHandler);

DiscordClientService.on('interactionCreate', responseHandler);

DiscordRestService.put(Routes.applicationCommands(discordAppId), {
  body: commands,
});

GasService.getStations();
