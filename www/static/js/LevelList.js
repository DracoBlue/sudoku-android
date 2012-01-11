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
        'animal': 'duck',
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
        'animal': 'hare',
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
        'animal': 'cow',
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
    {animal:"cow", fields:["ryb.",".gry","..y.",".b.r",]},

    // level 1
    {animal:"cow", fields:[".rgy","y..b","g...",".by.",]},
    {animal:"cow", fields:["grb.","y..r","...g",".gy.",]},
    {animal:"cow", fields:[".brg","r..y","g...",".yg.",]},
    {animal:"cow", fields:[".ygb","....","yr.g",".b.r",]},
    {animal:"cow", fields:["bgy.","....","g.ry","r.b.",]},
    {animal:"cow", fields:[".gy.","y.r.",".r..",".ybr",]},
    {animal:"cow", fields:[".yg.",".r.y","..r.","rby.",]},
    {animal:"cow", fields:["b.y.",".rbg","..g.","g..y",]},
    {animal:"cow", fields:["r..y","..b.",".ryg","g.r.",]},
    {animal:"cow", fields:["...r","gyr.","brbg","r...",]},
    {animal:"cow", fields:["brg.",".gy.","g.b.",".b..",]},

    // level 2
    {animal:"cow", fields:["r..y",".bg.",".ry.","b..g",]},
    {animal:"cow", fields:[".bg.","r..y","b..g",".ry.",]},
    {animal:"cow", fields:["rb..","..br","..gy","ry..",]},
    {animal:"cow", fields:["b.r.",".y.g","y.g.",".b.r",]},
    {animal:"cow", fields:["r..b",".b.y","b.y.","y..r",]},
    {animal:"cow", fields:["b.rg",".r..","..g.","rg.b",]},
    {animal:"cow", fields:["r..b","g.r.",".g.r","b..g",]},
    {animal:"cow", fields:["..g.","rgy.",".r.y","b.r.",]},
    {animal:"cow", fields:["rb..","..b.",".yr.","b..y",]},
    {animal:"cow", fields:["r..b","yb..","..gy","...r",]},

    // level 3
    {animal:"cow", fields:["..b.",".g..","g..y",".r.b",]},
    {animal:"cow", fields:["b..y","g..r",".br.","....",]},
    {animal:"cow", fields:["yr..","..r.","..b.","bg..",]},
    {animal:"cow", fields:[".b..","y.b.","...r","g.r.",]},
    {animal:"cow", fields:["byr.","r...","..y.","...g",]},
    {animal:"cow", fields:["...g",".ry.",".gb.","y...",]},
    {animal:"cow", fields:["r..g","..y.",".g..","y..b",]},
    {animal:"cow", fields:["..br","...g",".g..","y..b",]},
    {animal:"cow", fields:["..g.","..ry","gy..",".b..",]},
    {animal:"cow", fields:["yr..","g...","...g","..by",]},

    // level 4
    {animal:"cow", fields:["....","b...","y..r","...g",]},
    {animal:"cow", fields:[".y..",".rb.","..g.","....",]},
    {animal:"cow", fields:["b...",".g.y","..r.","....",]},
    {animal:"cow", fields:[".rg.","....","by..","....",]},
    {animal:"cow", fields:["....","b...",".y.b","..r.",]},
    {animal:"cow", fields:[".g..","..r.",".y..","..b.",]},
    {animal:"cow", fields:["....","g..b",".rb.","....",]},
    {animal:"cow", fields:[".r..","..g.","...y","..r.",]},
    {animal:"cow", fields:["b...",".r..",".g.b","....",]},
    {animal:"cow", fields:["..r.","....",".by.","r...",]}
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
            'name':"Level " + n,
            'animal': level.animal,
            'field': from_string(level.fields)
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
    
    li_element.text(data.name + (level.get('finished') ? ' (geschafft)' : ' (neu)'));
    li_element.bind('click', function()
    {
        jsb.fireEvent('LevelList::CLOSE');
        jsb.fireEvent('PlayingField::OPEN');
        jsb.fireEvent('PlayingField::LOAD_LEVEL', {
            'field': data.field,
            'animal': data.animal,
            'name': data.name
        });
    });
    
    this.ol_element.append(li_element);
};

jsb.registerHandler('level_list', LevelList);