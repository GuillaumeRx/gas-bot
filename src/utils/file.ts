import AdmZip from 'adm-zip';
import { xml2js } from 'xml-js';

export const decompress = (buffer: Buffer) => {
  const zip = new AdmZip(buffer);
  const file = zip.getEntries()[0];

  const data = xml2js(file.getData().toString('utf8'), { compact: true });
  return data;
};
