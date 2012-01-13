Instructions = function(dom_element, options)
{
    this.dom_element = jQuery(dom_element);
    this.initializeListeners();
};

Instructions.prototype.initializeListeners = function() 
{
    var that = this;
    
    this.dom_element.find('.js_continue_button').bind('click', function() {
        that.close();
    });
    
    jsb.on('Instructions::OPEN', function(values)
    {
        that.dom_element.removeClass('hide');
    });

    jsb.on('Instructions::CLOSE', function()
    {
        that.dom_element.addClass('hide');
    });
};

Instructions.prototype.close = function()
{
    jsb.fireEvent('Instructions::CLOSE');
    jsb.fireEvent('PlayingField::OPEN');
};

jsb.registerHandler('instructions', Instructions);