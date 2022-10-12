import {
  Client,
  PlaceAutocompleteType,
} from '@googlemaps/google-maps-services-js';
import { mapsApiKey } from '../config/env';

const googleMapsFactory = () => {
  const client = new Client({});

  const getGeocode = async (placeId: string) => {
    const {
      data: { results },
    } = await client.geocode({
      params: {
        place_id: placeId,
        key: mapsApiKey,
      },
    });

    return results[0];
  };

  const autocompletePlace = async (query: string, sessionToken: string) => {
    const {
      data: { predictions },
    } = await client.placeAutocomplete({
      params: {
        input: query,
        sessiontoken: sessionToken,
        types: PlaceAutocompleteType.geocode,
        components: ['country:fr'],
        key: mapsApiKey,
      },
    });

    return predictions;
  };

  return { autocompletePlace, getGeocode };
};

export const GoogleMapService = googleMapsFactory();
