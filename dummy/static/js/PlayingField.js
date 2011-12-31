PlayingField = function(dom_element, options)
{
    this.grid_dom_elements = {};
    this.grid_models = {};
    this.dom_element = jQuery(dom_element);
    this.initializeGrid();
    this.initializeRandomData();
    this.initializeListeners();

};

PlayingField.prototype.initializeListeners = function()
{
    var that = this;
    
    that.dom_element.find('.js_menu_button').bind('click', function() {
        jsb.fireEvent('PlayingField::CLOSE');
        jsb.fireEvent('LevelList::OPEN');
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
        for ( var x = 0; x < 4; x++)
        {
            for ( var y = 0; y < 4; y++)
            {
                var color_string = data.field[x][y];
                
                that.grid_models[x][y].set({
                    'fixed': color_string === 'empty' ? false : true
                });
                
                that.setFieldColor(x, y, color_string);
            }
        }
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
        x: x,
        y: y,
        color: 'empty'
    });

    grid_model.bind('change:color', function()
    {
        that.onGridColorChanged(this);
    });

    this.grid_models[x] = this.grid_models[x] || {};
    this.grid_models[x][y] = grid_model;

    var grid_view = new PlayingFieldGridItemView({
        model: grid_model
    });

    this.grid_dom_elements[x] = this.grid_dom_elements[x] || {};
    this.grid_dom_elements[x][y] = grid_view;

    grid_view.render();

    return grid_view;
};

PlayingField.prototype.initializeRandomData = function()
{
    var random_colors = [
            'red', 'green', 'blue', 'yellow', 'empty'
    ];
    for ( var x = 0; x < 4; x++)
    {
        for ( var y = 0; y < 4; y++)
        {
            var random_position = Math.floor(5 * Math.random());
            this.setFieldColor(x, y, random_colors[random_position]);
        }
    }
};

PlayingField.prototype.onGridColorChanged = function(model)
{
    console.log('onGridColorChanged', model.get('x'), 'x', model.get('y'), ':', model.get('color'));
};

PlayingField.prototype.setFieldColor = function(x, y, color_string)
{
    this.grid_models[x][y].set({
        'color': color_string
    });
};

jsb.registerHandler('playing_field', PlayingField);