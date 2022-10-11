import { Routes } from 'discord.js'
import * as dotenv from 'dotenv'
import { commands, COMMAND_NAMES, discordAppId, discordToken } from './config'
import {
  DiscordClientService,
  DiscordRestService,
  GoogleMapService,
} from './services'
import { compress } from 'lz-string'

dotenv.config()

DiscordClientService.once('ready', () => {
  console.log('Gas Bot is online !')
})

DiscordClientService.login(discordToken)

DiscordClientService.on('interactionCreate', async (interaction) => {
  if (!interaction.isAutocomplete()) return

  if (interaction.commandName === COMMAND_NAMES.Notify) {
    const focusedValue = interaction.options.getFocused()

    if (focusedValue && focusedValue !== '') {
      const {
        data: { predictions },
      } = await GoogleMapService.autocompletePlace(focusedValue)

      await interaction.respond(
        predictions.map(({ description, place_id }) => {
          return {
            name: description,
            value: compress(place_id),
          }
        }),
      )
    }
  }
})

DiscordRestService.put(Routes.applicationCommands(discordAppId), {
  body: commands,
})
