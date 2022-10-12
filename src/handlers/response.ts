import { Interaction } from 'discord.js';
import { COMMAND_NAMES } from '../config';

export const responseHandler = async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === COMMAND_NAMES.Notify) {
    await interaction.reply(`Okay, I will notify you if I find gas !`);
  }
};
