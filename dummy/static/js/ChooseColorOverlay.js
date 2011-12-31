ChooseColorOverlay = function(dom_element, options)
{
    this.dom_element = jQuery(dom_element);
    this.initializeListeners();
    
    this.selected_field = {};
};

ChooseColorOverlay.prototype.initializeListeners = function() 
{
    var that = this;
    
    this.dom_element.find('li').bind('click', function() {
        var li_element = jQuery(this);
        li_element.removeClass('selected');
        var color_string = li_element.attr('class');
        that.selected_field.set({
            'color': color_string
        });
        that.close();
    });
    
    jsb.on('ChooseColorOverlay::OPEN', function(values)
    {
        that.selected_field = values.field;
        var color_string = that.selected_field.get('color');
        that.dom_element.find('li').removeClass('selected');
        that.dom_element.find('li.' + color_string).addClass('selected');
        that.dom_element.removeClass('hide');
    });

    jsb.on('ChooseColorOverlay::CLOSE', function()
    {
        that.dom_element.addClass('hide');
    });
};

ChooseColorOverlay.prototype.close = function()
{
    jsb.fireEvent('ChooseColorOverlay::CLOSE');
    jsb.fireEvent('PlayingField::OPEN');
};

jsb.registerHandler('choose_color_overlay', ChooseColorOverlay);