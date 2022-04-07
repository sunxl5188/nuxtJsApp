export const getCookiesInServer = (req) => {
  const serviceCookie = {};
  req && req.headers.cookie && req.headers.cookie.split(';').forEach(function (val) {
    const parts = val.split('=');
    serviceCookie[parts[0].trim()] = (parts[1] || '').trim();
  });
  return serviceCookie;
}

export const getPrefix = () => {
  let PREFIX
  if (process.env.NODE_ENV === 'development') {
    PREFIX = process.env.NUXT_ENV_DEVELOPMENT_PREFIX
  }else{
    PREFIX = process.env.NUXT_ENV_PRODUCTION_PREFIX
  }
  return PREFIX
}
