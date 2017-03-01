const baseUrl = 'https://honesty.store';

const rootEl = document.getElementById('root');
const offlineEl = document.getElementById('offline');

const onDeviceReady = () => {
  document.addEventListener('offline', onOffline);
  document.addEventListener('online', onOnline);

  loadApplicationAssetsIfNeeded();

  universalLinks.subscribe(null, didLaunchAppFromLink);
};

const didLaunchAppFromLink = (eventData) => {
  loadApplicationAssetsIfNeeded()
    .then(() => {
      const { pathname, search } = new URL(eventData.url);

      const currentLocationMinusRoute = window.location.href.replace(/(.*index.html)(.*)/, '$1');
      window.location = `${currentLocationMinusRoute}#${pathname}${search}`;
      window.location.reload();
    });
};

const onOffline = () => {
  rootEl.classList.add('invisible');
  offlineEl.classList.remove('invisible');

  document.documentElement.classList.add('expand-height');
};

const onOnline = () => {
  rootEl.classList.remove('invisible');
  offlineEl.classList.add('invisible');

  document.documentElement.classList.remove('expand-height');

  loadApplicationAssetsIfNeeded();
};

const loadApplicationAssetsIfNeeded = () => {
  const hasLoadedAssets = () => document.getElementsByClassName('asset').length > 0;

  if (hasLoadedAssets()) {
    return Promise.resolve();
  }

  return fetch(`${baseUrl}/asset-manifest.json`)
    .then(r => r.json())
    .then(assets => {

      if (hasLoadedAssets()) {
        /* Protect the odd case where we get multiple calls to load assets in quick succession - we
        don't want to add mulitple scripts to the same file */
        return;
      }

      const mainJS = assets['main.js'];
      const mainCSS = assets['main.css'];

      const scriptEl = document.createElement('script');
      scriptEl.setAttribute('src', `${baseUrl}/${mainJS}`);
      scriptEl.setAttribute('class', 'asset');
      document.body.appendChild(scriptEl);

      const styleEl = document.createElement('link');
      styleEl.setAttribute('rel', 'stylesheet');
      styleEl.setAttribute('href', `${baseUrl}/${mainCSS}`);
      document.head.appendChild(styleEl);
    })
    .catch(onOffline);
};

document.addEventListener('deviceready', onDeviceReady, false);
