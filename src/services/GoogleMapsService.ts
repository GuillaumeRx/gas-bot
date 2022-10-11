import { Client } from '@googlemaps/google-maps-services-js'
import { mapsApiKey } from '../config/env'

const googleMapsFactory = () => {
  const client = new Client({})

  const autocompletePlace = async (query: string) => {
    return client.placeAutocomplete({
      params: {
        input: query,
        key: mapsApiKey,
      },
    })
  }

  return { autocompletePlace }
}

export const GoogleMapService = googleMapsFactory()
