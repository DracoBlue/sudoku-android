YouWon = function(dom_element, options)
{
    this.dom_element = jQuery(dom_element);
    this.initializeListeners();
};

YouWon.prototype.initializeListeners = function() 
{
    var that = this;
    
    this.dom_element.find('.js_continue_button').bind('click', function() {
        that.close();
    });
    
    jsb.on('YouWon::OPEN', function(values)
    {
        that.dom_element.find('.js_name').text(values.level_name);
        that.dom_element.find('.js_used_moves').text(values.used_moves == 1 ? (values.used_moves + ' Zug') : (values.used_moves + ' Züge'));
        that.dom_element.find('.js_time').text(values.time_in_seconds + ' Sekunden');
        that.dom_element.removeClass('hide');
        that.dom_element.hide().fadeIn();        
    });

    jsb.on('YouWon::CLOSE', function()
    {
        that.dom_element.fadeOut();        
    });
};

YouWon.prototype.close = function()
{
    jsb.fireEvent('YouWon::CLOSE');
    jsb.fireEvent('LevelList::OPEN');
};

jsb.registerHandler('you_won', YouWon);