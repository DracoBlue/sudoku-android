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
    {animal:"duck", fields:["ryb.",".gry","..y.",".b.r",]},
    {animal:"pig",  fields:[".rgy","y..b","g...",".by.",]},

    // level 1
    {animal:"duck", fields:["grb.","y..r","...g",".gy.",]},
    {animal:"pig",  fields:[".brg","r..y","g...",".yg.",]},
    {animal:"cow",  fields:[".ygb","....","yr.g",".b.r",]},
    {animal:"hare", fields:["bgy.","....","g.ry","r.b.",]},
    {animal:"duck", fields:[".gy.","y.r.",".r..",".ybr",]},
    {animal:"pig",  fields:[".yg.",".r.y","..r.","rby.",]},
    {animal:"cow",  fields:["b.y.",".rbg","..g.","g..y",]},
    {animal:"hare", fields:["r..y","..b.",".ryg","g.r.",]},
    {animal:"duck", fields:["...r","gyr.","brbg","r...",]},
    {animal:"pig",  fields:["brg.",".gy.","g.b.",".b..",]},

    // level 2
    {animal:"cow",  fields:["r..y",".bg.",".ry.","b..g",]},
    {animal:"hare", fields:[".bg.","r..y","b..g",".ry.",]},
    {animal:"duck", fields:["rb..","..br","..gy","ry..",]},
    {animal:"pig",  fields:["b.r.",".y.g","y.g.",".b.r",]},
    {animal:"cow",  fields:["r..b",".b.y","b.y.","y..r",]},
    {animal:"hare", fields:["b.rg",".r..","..g.","rg.b",]},
    {animal:"duck", fields:["r..b","g.r.",".g.r","b..g",]},
    {animal:"pig",  fields:["..g.","rgy.",".r.y","b.r.",]},
    {animal:"cow",  fields:["rb..","..b.",".yr.","b..y",]},
    {animal:"hare", fields:["r..b","yb..","..gy","...r",]},

    // level 3
    {animal:"duck", fields:["..b.",".g..","g..y",".r.b",]},
    {animal:"pig",  fields:["b..y","g..r",".br.","....",]},
    {animal:"cow",  fields:["yr..","..r.","..b.","bg..",]},
    {animal:"hare", fields:[".b..","y.b.","...r","g.r.",]},
    {animal:"duck", fields:["byr.","r...","..y.","...g",]},
    {animal:"pig",  fields:["...g",".ry.",".gb.","y...",]},
    {animal:"cow",  fields:["r..g","..y.",".g..","y..b",]},
    {animal:"hare", fields:["..br","...g",".g..","y..b",]},
    {animal:"duck", fields:["..g.","..ry","gy..",".b..",]},
    {animal:"pig",  fields:["yr..","g...","...g","..by",]},

    // level 4
    {animal:"cow",  fields:["....","b...","y..r","...g",]},
    {animal:"hare", fields:[".y..",".rb.","..g.","....",]},
    {animal:"duck", fields:["b...",".g.y","..r.","....",]},
    {animal:"pig",  fields:[".rg.","....","by..","....",]},
    {animal:"cow",  fields:["....","b...",".y.b","..r.",]},
    {animal:"hare", fields:[".g..","..r.",".y..","..b.",]},
    {animal:"duck", fields:["....","g..b",".rb.","....",]},
    {animal:"pig",  fields:[".r..","..g.","...y","..r.",]},
    {animal:"cow",  fields:["b...",".r..",".g.b","....",]},
    {animal:"hare", fields:["..r.","....",".by.","r...",]}
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