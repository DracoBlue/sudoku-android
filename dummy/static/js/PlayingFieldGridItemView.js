PlayingFieldGridItemView = Backbone.View.extend({

    tagName: "li",

    className: "",

    events: {
        "click": "clickField"
    },

    initialize: function()
    {
        var that = this;
        that.model.bind('change', function()
        {
            that.render();
        });
    },

    clickField: function(event)
    {
        if (this.model.get('fixed'))
        {
            /*
             * We cannot modify a fixed field!
             */
            return;
        }
        console.log('Hit!', this.model.get('x'), this.model.get('y'));

        jsb.fireEvent('PlayingField::CLOSE');
        jsb.fireEvent('ChooseColorOverlay::OPEN', {
            'field': this.model
        });
    },

    render: function()
    {
        var element = jQuery(this.el);
        element.removeClass();
        element.addClass(this.model.get('color'));
        if (this.model.get('fixed'))
        {
            element.addClass('fixed');
        }
        element.text(this.model.get('x') + ' ' + this.model.get('y') + ': ' + this.model.get('color'));
    }

});