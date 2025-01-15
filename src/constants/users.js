export const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const accessTokenLifeTime = Date.now() + 1000 * 60 * 15;

export const refreshTokenLifeTime = Date.now() + 1000 * 60 * 60 * 24 * 30;
