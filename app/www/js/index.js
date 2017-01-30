var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        document.getElementById('frame').src = 'https://honesty.store';
        universalLinks.subscribe(null, this.didLaunchAppFromLink);
    },

    didLaunchAppFromLink: function(eventData) {
        document.getElementById('frame').src = eventData.url;
    }
};

app.initialize();