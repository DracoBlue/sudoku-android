Grid = Backbone.Collection.extend({
    model: PlayingFieldGridItem,
    
    size: 4,
    
    initialize: function() {
        var that = this;
        this.bind('change', function() {
            console.log('change?');
            if (that.isComplete()) {
                console.log('complete!');
                that.trigger('is_complete');
            }
        });
    },
    
    isFilled: function() {
        return !this.anyCellEmptyOrUndefined();
    },
    
    anyCellEmptyOrUndefined: function() {
        return this.any( function ( cell ) {
            var color = cell.get("color");
            return (color === undefined) || (color === 'empty');
        });        
    },
    
    isComplete: function() {
        if (!this.isFilled()) {
            return false;
        }
        
        var is_complete = true;
        for (var i = 0; i < this.size; i++) {
            is_complete = is_complete && this.hasColAllDifferentColors(i);
            is_complete = is_complete && this.hasRowAllDifferentColors(i);
        }
        return is_complete;
    },
    
    hasRowAllDifferentColors: function(row_number) {
        var colors = [];
        
        this.each(function(grid_item) {
            if (grid_item.get('y') == row_number) {
                colors.push(grid_item.get('color'));
            }
        });
        
        return this.size === _.uniq(colors).length;
    },
    
    hasColAllDifferentColors: function(col_number) {
        var colors = [];
        
        this.each(function(grid_item) {
            if (grid_item.get('x') == col_number) {
                colors.push(grid_item.get('color'));
            }
        });
        
        return this.size === _.uniq(colors).length;
    }
});
