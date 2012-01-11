PlayingField = function(dom_element, options)
{
    this.grid_dom_elements = {};
    this.dom_element = jQuery(dom_element);
    this.level_name = null;
    this.start_time = null;
    this.used_moves = 0;
    this.grid = new Grid();
    this.initializeGrid();
    this.initializeListeners();
};

PlayingField.prototype.initializeListeners = function()
{
    var that = this;
    
    that.dom_element.find('.js_menu_button').bind('click', function() {
        jsb.fireEvent('PlayingField::CLOSE');
        jsb.fireEvent('LevelList::OPEN');
    });
    
    this.grid.bind("is_complete", function() {
        var now = new Date();
        var time_in_seconds = Math.ceil((now.getTime() - that.start_time.getTime()) / 1000);
        
        jsb.fireEvent('PlayingField::CLOSE');
        jsb.fireEvent('Level::FINISHED', {
            "name": that.level_name,
            "used_moves": that.used_moves,
            "time_in_seconds": time_in_seconds
        });
        jsb.fireEvent('YouWon::OPEN', {
            "level_name": that.level_name,
            "used_moves": that.used_moves,
            "time_in_seconds": time_in_seconds
        });
        
        console.log("you win!!");
    });    
    
    jsb.on('PlayingField::OPEN', function()
    {
        that.dom_element.removeClass('hide');
    });

    jsb.on('PlayingField::CLOSE', function()
    {
        that.dom_element.addClass('hide');
    });

    jsb.on('PlayingField::LOAD_LEVEL', function(data)
    {
        that.level_name = data.name;
        that.start_time = new Date();
        that.used_moves = 0;
        that.clearGrid();
        
        that.grid.each(function(grid_item) {
            var x = grid_item.get('x');
            var y = grid_item.get('y');
            var color_string = data.field[x][y];
            grid_item.set({
                'fixed': color_string === 'empty' ? false : true,
                'color': color_string
            });
        });
    });
};

PlayingField.prototype.clearGrid = function()
{
    this.grid.each(function(grid_item) {
        grid_item.set({
            'fixed': false,
            'color': 'empty'
        });
    });
};

PlayingField.prototype.initializeGrid = function()
{
    var that = this;
    var x_y_container = jQuery('<ol />');
    for ( var x = 0; x < 4; x++)
    {
        var x_container = jQuery('<ol />');
        for ( var y = 0; y < 4; y++)
        {
            var y_element_view = this.createAndInitializeGridElementView(x, y);
            x_container.append(y_element_view.el);
        }
        x_y_container.append(x_container);
    }

    this.dom_element.append(x_y_container);
};

PlayingField.prototype.createAndInitializeGridElementView = function(x, y)
{
    var that = this;

    /*
     * Backbone Model
     */
    var grid_model = new PlayingFieldGridItem({
        id: (x + "," + y),
        x: x,
        y: y,
        color: 'empty'
    });
    
    grid_model.bind('change:color', function()
    {
        that.used_moves++;
    });

    this.grid.add(grid_model);

    var grid_view = new PlayingFieldGridItemView({
        model: grid_model
    });

    this.grid_dom_elements[x] = this.grid_dom_elements[x] || {};
    this.grid_dom_elements[x][y] = grid_view;

    grid_view.render();

    return grid_view;
};

jsb.registerHandler('playing_field', PlayingField);