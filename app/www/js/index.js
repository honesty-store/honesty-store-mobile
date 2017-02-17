var baseUrl = 'https://honesty.store';

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
    // TODO: Prefix url with # where necessary
    alert(eventData.url);
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