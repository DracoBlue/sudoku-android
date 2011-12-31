PlayingFieldGridItemView = Backbone.View.extend({

    tagName: "li",

    className: "",

    events: {
        "click": "clickField"
    },

    initialize: function()
    {
        var that = this;
        that.model.bind('change:color', function()
        {
            that.render();
        });
    },

    clickField: function()
    {
        console.log('Hit!', this.model.get('x'), this.model.get('y'));
    },

    render: function()
    {
        var element = jQuery(this.el);
        element.removeClass();
        element.addClass(this.model.get('color'));
        element.text(this.model.get('x') + ' ' + this.model.get('y') + ': ' + this.model.get('color'));
    }

});