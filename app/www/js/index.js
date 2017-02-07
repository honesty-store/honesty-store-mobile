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

  onOffline: function () {
    this.loadURL('offline.html');
  },

  onOnline: function () {
    this.loadURL(baseUrl) // Again, may need to bind 'this'
  },

  loadURL: function (url) {
    document.getElementById('frame').src = url;
  }
};

app.initialize();