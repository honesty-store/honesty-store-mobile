var prefix = 'https://honesty.store';
fetch(prefix + '/asset-manifest.json')
  .then(r => r.json())
  .then(assets => {
    var mainJS = assets['main.js'];
    var mainCSS = assets['main.css'];

    var scriptEl = document.createElement('script');
    scriptEl.setAttribute('src', prefix + '/' + mainJS);
    document.body.appendChild(scriptEl);

    var styleEl = document.createElement('link');
    styleEl.setAttribute('rel', 'stylesheet');
    styleEl.setAttribute('href', prefix + '/' + mainCSS);
    document.head.appendChild(styleEl);
  });