import { validate, version } from 'uuid';

export const isValidUuidV4 = (uuid: string): boolean => {
  return validate(uuid) && version(uuid) === 4;
};
