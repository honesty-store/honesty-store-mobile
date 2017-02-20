var baseUrl = 'https://honesty.store';

// Add Promise polyfill
if (!window.Promise) {
  window.Promise = Promise;
}

var app = {
  initialize: function () {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },

  onDeviceReady: function () {
    // Register for connectivity events
    document.addEventListener("offline", this.onOffline.bind(this));
    document.addEventListener("online", this.onOnline.bind(this));

    this.loadApplicationAssets();

    universalLinks.subscribe(null, this.didLaunchAppFromLink.bind(this));
  },

  didLaunchAppFromLink: function (eventData) {
    // Pull out url beyond domain
    var urlPortionRegex = /(honesty\.store\/)(.*)/;
    var urlMatches = urlPortionRegex.exec(eventData.url);

    if (urlMatches.length !== 3) {
      return;
    }

    var newRoute = urlMatches[2];
    var currentLocationMinusRoute = window.location.href.replace(/(.*index.html#\/)(.*)/, '$1');
    window.location = currentLocationMinusRoute + newRoute;
  },

  onOffline: function () {
    var rootEl = document.getElementById('root');
    rootEl.classList.add('invisible');
    var offlineEl = document.getElementById('offline');
    offlineEl.classList.remove('invisible');

    document.documentElement.classList.add('expand-height');
  },

  onOnline: function () {
    var rootEl = document.getElementById('root');
    rootEl.classList.remove('invisible');
    var offlineEl = document.getElementById('offline');
    offlineEl.classList.add('invisible');

    document.documentElement.classList.remove('expand-height');

    if (document.documentElement.classList.indexOf('loaded') === -1) {
      // Hasn't yet fetched assets
      this.loadApplicationAssets();
    }
  },

  loadApplicationAssets: function () {
    fetch(baseUrl + '/asset-manifest.json')
      .then(r => r.json())
      .then(assets => {
        var mainJS = assets['main.js'];
        var mainCSS = assets['main.css'];

        var scriptEl = document.createElement('script');
        scriptEl.setAttribute('src', baseUrl + '/' + mainJS);
        document.body.appendChild(scriptEl);

        var styleEl = document.createElement('link');
        styleEl.setAttribute('rel', 'stylesheet');
        styleEl.setAttribute('href', baseUrl + '/' + mainCSS);
        document.head.appendChild(styleEl);
      });
  }
};

app.initialize();