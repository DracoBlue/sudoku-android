Grid = Backbone.Collection.extend({
    model: PlayingFieldGridItem,
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
