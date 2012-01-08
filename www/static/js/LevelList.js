LevelList = function(dom_element, options)
{
    this.dom_element = jQuery(dom_element);
    this.ol_element = jQuery('<ol />');
    this.dom_element.append(this.ol_element);
    this.finished_levels = new FinishedLevels();
    this.finished_levels.fetch();
    this.levels = new Backbone.Collection();
    this.initializeLevels();
    this.initializeLevelsFromStrings();
    this.initializeListeners();
};

LevelList.prototype.initializeListeners = function()
{
    var that = this;
    
    jsb.on('Level::FINISHED', function(values)
    {
        that.finished_levels.create({"name": values.name, "time_in_seconds": values.time_in_seconds});
        
        var level = that.levels.find(function(current_level) {
            return current_level.get('name') === values.name ? true : false;
        });
        
        level.set({'finished': true});
    });

    jsb.on('LevelList::OPEN', function()
    {
        that.dom_element.removeClass('hide');
    });

    jsb.on('LevelList::CLOSE', function()
    {
        that.dom_element.addClass('hide');
    });
};

LevelList.prototype.initializeLevels = function()
{
    this.createLevel({
        'name': 'The Difficult One',
        'field': [
                [
                        'red', 'green', 'empty', 'blue'
                ], [
                        'empty', 'empty', 'empty', 'empty'
                ], [
                        'empty', 'empty', 'green', 'empty'
                ], [
                        'empty', 'empty', 'empty', 'empty'
                ]
        ]
    });
    
    this.createLevel({
        'name': 'Another One',
        'field': [
                [
                        'blue', 'empty', 'empty', 'empty'
                ], [
                        'empty', 'blue', 'empty', 'empty'
                ], [
                        'empty', 'empty', 'blue', 'empty'
                ], [
                        'empty', 'empty', 'empty', 'empty'
                ]
        ]
    });
    
    this.createLevel({
        'name': 'Test Winning',
        'field': [
                [
                        'blue',   'red',    'green',  'yellow'
                ], [
                        'yellow', 'blue',   'red',    'green'
                ], [
                        'green',  'yellow', 'blue',   'red'
                ], [
                        'red',    'green',  'yellow', 'empty'
                ]
        ]
    });
    
};

LevelList.prototype.initializeLevelsFromStrings = function() {
    
    var levelStrings = [
    //red='r'
    //green='g'
    //blue='b'
    //yellow='y'
    //empty='.'

    // demo
    [
    "ryb.",
    ".gry",
    "..y.",
    ".b.r",
    ],[
    // level 1
    ".rgy",
    "y..b",
    "g...",
    ".by.",
    ],[
    "grb.",
    "y..r",
    "...g",
    ".gy.",
    ],[
    ".brg",
    "r..y",
    "g...",
    ".yg.",
    ],[

    ".ygb",
    "....",
    "yr.g",
    ".b.r",
    ],[

    "bgy.",
    "....",
    "g.ry",
    "r.b.",
    ],[

    ".gy.",
    "y.r.",
    ".r..",
    ".ybr",
    ],[

    ".yg.",
    ".r.y",
    "..r.",
    "rby.",
    ],[

    "b.y.",
    ".rbg",
    "..g.",
    "g..y",
    ],[

    "r..y",
    "..b.",
    ".ryg",
    "g.r.",
    ],[

    "...r",
    "gyr.",
    "brbg",
    "r...",
    ],[

    "brg.",
    ".gy.",
    "g.b.",
    ".b..",
    ],[

    // level 2

    "r..y",
    ".bg.",
    ".ry.",
    "b..g",
    ],[

    ".bg.",
    "r..y",
    "b..g",
    ".ry.",
    ],[

    "rb..",
    "..br",
    "..gy",
    "ry..",
    ],[

    "b.r.",
    ".y.g",
    "y.g.",
    ".b.r",
    ],[

    "r..b",
    ".b.y",
    "b.y.",
    "y..r",
    ],[

    "b.rg",
    ".r..",
    "..g.",
    "rg.b",
    ],[

    "r..b",
    "g.r.",
    ".g.r",
    "b..g",
    ],[

    "..g.",
    "rgy.",
    ".r.y",
    "b.r.",
    ],[

    "rb..",
    "..b.",
    ".yr.",
    "b..y",
    ],[

    "r..b",
    "yb..",
    "..gy",
    "...r",
    ],[

    // level 3

    "..b.",
    ".g..",
    "g..y",
    ".r.b",
    ],[

    "b..y",
    "g..r",
    ".br.",
    "....",
    ],[

    "yr..",
    "..r.",
    "..b.",
    "bg..",
    ],[

    ".b..",
    "y.b.",
    "...r",
    "g.r.",
    ],[

    "byr.",
    "r...",
    "..y.",
    "...g",
    ],[

    "...g",
    ".ry.",
    ".gb.",
    "y...",
    ],[

    "r..g",
    "..y.",
    ".g..",
    "y..b",
    ],[

    "..br",
    "...g",
    ".g..",
    "y..b",
    ],[

    "..g.",
    "..ry",
    "gy..",
    ".b..",
    ],[

    "yr..",
    "g...",
    "...g",
    "..by",
    ],[

    // level 4

    "....",
    "b...",
    "y..r",
    "...g",
    ],[

    ".y..",
    ".rb.",
    "..g.",
    "....",
    ],[

    "b...",
    ".g.y",
    "..r.",
    "....",
    ],[

    ".rg.",
    "....",
    "by..",
    "....",
    ],[

    "....",
    "b...",
    ".y.b",
    "..r.",
    ],[

    ".g..",
    "..r.",
    ".y..",
    "..b.",
    ],[

    "....",
    "g..b",
    ".rb.",
    "....",
    ],[

    ".r..",
    "..g.",
    "...y",
    "..r.",
    ],[

    "b...",
    ".r..",
    ".g.b",
    "....",
    ],[

    "..r.",
    "....",
    ".by.",
    "r...",
    ]
    ]
    
    var that = this;
    
    var char_map = {
        'r': 'red',
        'g': 'green',
        'b': 'blue',
        'y': 'yellow',
        '.': 'empty'
    }

    function split_string (s) {
        //assume all strings are of length 4
        return [s[0],s[1],s[2],s[3]];
    }
    
    function from_string (string_arr) {
        return _.map(string_arr, function(s){
            var splitted = split_string(s);
            return _.map(splitted, function(c){
                return char_map[c];
            })
        });
    }
    
    _.each(levelStrings, function(level, n){
        that.createLevel({
            'name':"level_" + n,
            'field': from_string(level)
        });
    });
    
}



LevelList.prototype.createLevel = function(data)
{
    var that = this;
    
    data.finished = that.finished_levels.hasFinishedLevelByName(data.name) ? true : false;
    
    var level = new Level(data);
    this.levels.add(level);
    
    /*
     * TODO: refactor into LevelListItemView
     */
    var li_element = jQuery('<li />');
    
    level.bind('change', function() {
        li_element.text(data.name + ' (' + (level.get('finished') ? 'geschafft' : 'neu') + ')');
    });
    
    li_element.text(data.name + (level.get('finished') ? ' (geschafft)' : '(neu)'));
    li_element.bind('click', function()
    {
        jsb.fireEvent('LevelList::CLOSE');
        jsb.fireEvent('PlayingField::OPEN');
        jsb.fireEvent('PlayingField::LOAD_LEVEL', {
            'field': data.field,
            'name': data.name
        });
    });
    
    this.ol_element.append(li_element);
};

jsb.registerHandler('level_list', LevelList);