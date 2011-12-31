PlayingField = function(dom_element, options)
{
    this.grid_dom_elements = {};
    this.grid_models = {};
    this.dom_element = jQuery(dom_element);
    this.initializeGrid();
    this.initializeRandomData();

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
    
    this.grid_models[x] = this.grid_models[x] || {};
    this.grid_models[x][y] = grid_model;
    
    var grid_view =  new PlayingFieldGridItemView({
        model: grid_model
    });

    this.grid_dom_elements[x] = this.grid_dom_elements[x] || {};
    this.grid_dom_elements[x][y] = grid_view;
    
    grid_view.render();
    
    return grid_view;
};

PlayingField.prototype.initializeRandomData = function()
{
    var random_colors = ['red', 'green', 'blue', 'yellow', 'empty'];
    for ( var x = 0; x < 4; x++)
    {
        for ( var y = 0; y < 4; y++)
        {
            var random_position = Math.floor(5 * Math.random());
            this.setFieldColor(x, y, random_colors[random_position]);
        }
    }
};

PlayingField.prototype.setFieldColor = function(x, y, color_string)
{
    this.grid_models[x][y].set({
        'color': color_string
    });
};

jsb.registerHandler('playing_field', PlayingField);