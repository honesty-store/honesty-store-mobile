var baseUrl = 'https://honesty.store';

var app = {
  initialize: function () {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },

  onDeviceReady: function () {
    this.loadURL(baseUrl);
    universalLinks.subscribe(null, this.didLaunchAppFromLink.bind(this));

    // Register for connectivity events
    document.addEventListener("offline", this.onOffline.bind(this));
    document.addEventListener("online", this.onOnline.bind(this));
  },

  didLaunchAppFromLink: function (eventData) {
    this.loadURL(eventData.url); // Watch out... may need to bind 'this'...
  },

  /** TODO: Determine if the network connection plugin is still needed - we might ok to just rely on the web app itself. */
  onOffline: function () {
    this.loadURL('offline.html');
  },

  onOnline: function () {
    this.loadURL(baseUrl) // Again, may need to bind 'this'
  },

  loadURL: function (url) {
    console.log('TODO: Load url ' + url);
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