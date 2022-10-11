import { SlashCommandBuilder } from 'discord.js'

export enum COMMAND_NAMES {
  Notify = 'notify',
}

const notify = new SlashCommandBuilder()
  .setName(COMMAND_NAMES.Notify)
  .setDescription('Notify you when gas is available around you.')
  .addStringOption((option) =>
    option
      .setName('location')
      .setDescription('Your localisation')
      .setRequired(true)
      .setAutocomplete(true),
  )
  .addStringOption((option) =>
    option
      .setName('distance')
      .setDescription('the radius to search')
      .setRequired(true)
      .addChoices(
        {
          name: '10km',
          value: '10',
        },
        { name: '25km', value: '25' },
        { name: '50km', value: '50' },
        { name: '100km', value: '100' },
      ),
  )

const commandList = [notify]

export const commands = commandList.map((command) => command.toJSON())
