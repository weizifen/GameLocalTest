window.EventBus = {
    listeners: {},

    addListener: function (event, callback, target) {
        if (typeof this.listeners[event] != 'undefined') {
            this.listeners[event].push({ scope: target, callback: callback });
        } else {
            this.listeners[event] = [{ scope: target, callback: callback }];
        }
    },

    removeListenerByTarget: function (target) {
        if (target) {
            for (const event in this.listeners) {
                let listenerO = this.listeners[event];
                let newArray = [];
                for (let i = 0; i < listenerO.length; i++) {
                    // console.log(listenerO[i]['scope']);
                    const listener = listenerO[i];
                    if (listener && listener['scope'] !== target) {
                        newArray.push(listener);
                    }
                }
                this.listeners[event] = newArray;
            }
        }
    },

    removeListener: function (event, callback, target) {
        if (typeof this.listeners[event] != 'undefined' && event != undefined) {
            if (arguments.length == 1) {
                delete this.listeners[event];
                return;
            }
            let newArray = [];
            let numOfCallbacks = this.listeners[event].length;
            if (target) {
                for (let i = 0; i < numOfCallbacks; i++) {
                    let listener = this.listeners[event][i];
                    if (listener.scope != target || listener.callback != callback) {
                        newArray.push(listener);
                    }
                }
            } else {
                for (let i = 0; i < numOfCallbacks; i++) {
                    let listener = this.listeners[event][i];
                    if (listener.callback != callback) {
                        newArray.push(listener);
                    }
                }
            }

            this.listeners[event] = newArray;
        }
    },

    dispatch: function (event, target) {
        let args;
        if (arguments.length > 2) {
            args = Array.prototype.slice.call(arguments);
            args = args.slice(2);
        }

        if (typeof this.listeners[event] == 'undefined' || this.listeners[event].length == 0) {
            return false;
        }


        let listeners = this.listeners[event].slice();
        let numOfCallbacks = listeners.length;
        for (let i = 0; i < numOfCallbacks; i++) {
            let listener = listeners[i];
            if (target) {
                if (listener && listener.callback && listener.scope == target) {
                    listener.callback.apply(listener.scope, args);
                }
            } else {
                if (listener && listener.callback) {
                    if (listener.scope){
                        listener.callback.apply(listener.scope, args);
                    } else if(args) {
                        switch(args.length) {
                            case 1:
                                listener.callback(args[0]);
                                break;
                            case 2:
                                listener.callback(args[0], args[1]);
                                break;
                            case 3:
                                listener.callback(args[0], args[1], args[2]);
                                break;
                            default:
                                listener.callback();
                                break;
                        }
                    } else {
                        listener.callback();
                    }                      
                }
            }
        }
        return true;
    }
};