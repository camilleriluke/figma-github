const LOGGER_PREFIX = '[figma-github]';
export const info = (...args) => console.info(LOGGER_PREFIX, ...args);
export const log = info;
export const debug = (...args) => console.debug(LOGGER_PREFIX, ...args);
