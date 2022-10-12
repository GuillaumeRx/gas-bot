import axios from 'axios';
import { decompress } from '../utils';
export const gasFactory = () => {
  const getStations = async () => {
    const response = await axios.get(
      'https://donnees.roulez-eco.fr/opendata/instantane',
      {
        responseType: 'arraybuffer',
      },
    );
    const data = decompress(response.data);

    return data;
  };

  return { getStations };
};

export const GasService = gasFactory();
