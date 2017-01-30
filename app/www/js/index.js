var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        document.getElementById('frame').src = 'https://honesty.store';
        universalLinks.subscribe(null, this.didLaunchAppFromLink);
    },

    didLaunchAppFromLink: function(eventData) {
        document.getElementById('frame').src = eventData.url;
    }
};

app.initialize();