import { Interaction } from 'discord.js';
import { v4 as uuidv4 } from 'uuid';
import { COMMAND_NAMES } from '../config';
import { GoogleMapService } from '../services';

export const autocompleteHandler = async (interaction: Interaction) => {
  if (!interaction.isAutocomplete()) return;

  if (interaction.commandName === COMMAND_NAMES.Notify) {
    const focusedValue = interaction.options.getFocused();

    const sessionToken = uuidv4();

    if (focusedValue && focusedValue !== '') {
      const predictions = await GoogleMapService.autocompletePlace(
        focusedValue,
        sessionToken,
      );

      const responses = await Promise.all(
        predictions.map(async ({ description, place_id }) => {
          const {
            geometry: {
              location: { lat, lng },
            },
          } = await GoogleMapService.getGeocode(place_id);

          return {
            name: description,
            value: `${lat}-${lng}`,
          };
        }),
      );
      await interaction.respond(responses);
    }
  }
};
