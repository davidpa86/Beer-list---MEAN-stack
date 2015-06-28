(function() {
    var alertServiceFactory = function() {
        return {
            alerts: {},
            addAlert: function(message, type) {
                this.alerts[type] = this.alerts[type] || [];
                this.alerts[type].push(message);
                var self = this;
                setTimeout(function() {
                    self.removeAlerts.call(self,type);
                }, 3000);
            },
            removeAlerts: function(type) {
                if (this.alerts[type]) {
                    delete this.alerts[type];
                }
            }
        };
    };
    angular.module("appBeerList").factory("alertServiceFactory", [alertServiceFactory]);
}());