FinishedLevels = Backbone.Collection.extend({
    localStorage: new Store("finished_levels")
});

FinishedLevels.prototype.hasFinishedLevelByName = function(level_name) {
    var match = this.find(function(model) {
        return level_name === model.get('name');
    });
    
    return match ? true : false;
};