(function() {
    'use strict';
    
    if (!Object.prototype.watch) {
        Object.defineProperty(Object.prototype, 'watch', {
            configurable: true,
            value: function(prop, handler) {
                var oldvalue = this[prop];
                
                var getter = function() {
                    return oldvalue;
                }
                
                var setter = function(value) {
                    if (value === oldvalue) return false
                    
                    handler.call(this, prop, oldvalue, value); // This is called at each update
                    oldvalue = value;
                }

                if (delete this[prop]) {
                    Object.defineProperty(this, prop, {
                        get: getter,
                        set: setter,
                        enumerable: true,
                        configurable: true
                    });
                }
            }
        });
    }
        
    if (!Object.prototype.unwatch) {
        Object.defineProperty(Object.prototype, 'unwatch', {
            configurable: true,
            value: function(prop) {
                var value = this[prop];
                delete this[prop];
                this[prop] = value;
            }
        });
    }
})();
