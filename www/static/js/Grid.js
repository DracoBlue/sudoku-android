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
        return (!this.any_cell_undefined() && !this.any_cell_empty())
    },
    any_cell_empty: function() {
        return this.any( function ( cell ) {
            return cell.get("color") === 'empty';
        });        
    },
    any_cell_undefined: function() {
        return this.any( function ( cell ) {
            return cell.get("color") === undefined;
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

Line = Backbone.Collection.extend({
    model: PlayingFieldGridItem,
    hasAllDifferentColors: function () {
        var colors = this.pluck("color");
        console.log(colors);
        return colors.length === _.uniq(colors).length;
    }
});
