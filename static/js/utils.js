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

export const getVideoDuration = (url) => {
  // IOS的微信小程序中无法触发onloadedmetadata
  return new Promise((resolve, reject) => {
    const audio = new Audio(url);
    audio.muted = true;
    audio.play().then(() => audio.pause());
    audio.addEventListener('loadedmetadata', function() {
      console.log(audio.duration)
      resolve(parseInt((audio.duration * 1000).toString(), 10));
    });
    audio.muted = false;
  })
  // return new Promise((reslove) => {
  //   let video = document.createElement('video');
  //   video.preload = 'metadata';
  //   video.src = url;
  //   video.onloadedmetadata = () => {
  //     reslove(parseInt((video.duration * 1000).toString(), 10));
  //     video = null;
  //   };
  // });
}
export function getDuration (files) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(files)
    const oVideo = document.createElement('video')
    oVideo.setAttribute('src', url)
    oVideo.oncanplay = () => {
      resolve({ duration: oVideo.duration })
    }
  })
}
