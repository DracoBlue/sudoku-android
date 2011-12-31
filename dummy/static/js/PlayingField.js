PlayingField = function(dom_element, options)
{
    this.grid_dom_elements = {};
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
        this.grid_dom_elements[x] = {};
        var x_container = jQuery('<ol />');
        for ( var y = 0; y < 4; y++)
        {
            var y_element = this.createAndInitializeGridElement(x, y);
            x_container.append(y_element);
        }
        x_y_container.append(x_container);
    }

    this.dom_element.append(x_y_container);
};

PlayingField.prototype.createAndInitializeGridElement = function(x, y)
{
    var that = this;
    var grid_element = jQuery('<li />');
    grid_element.text(x + 'x' + y);
    grid_element.bind('click', function()
    {
        that.clickField(x, y);
    });
    
    this.grid_dom_elements[x][y] = grid_element;
    
    return grid_element;
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

PlayingField.prototype.clickField = function(x, y)
{
    console.log('Clicked:', x, y);
};

PlayingField.prototype.setFieldColor = function(x, y, color_string)
{
    console.log('setFieldColor', arguments);
    this.grid_dom_elements[x][y].removeClass().addClass(color_string);
};

jsb.registerHandler('playing_field', PlayingField);