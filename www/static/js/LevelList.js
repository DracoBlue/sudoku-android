LevelList = function(dom_element, options)
{
    this.dom_element = jQuery(dom_element);
    this.ol_element = jQuery('<ol />');
    this.dom_element.append(this.ol_element);
    this.initializeLevels();
    this.initializeListeners();
};

LevelList.prototype.initializeListeners = function()
{
    var that = this;
    

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

LevelList.prototype.createLevel = function(data)
{
    var li_element = jQuery('<li />');
    li_element.text(data.name);
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