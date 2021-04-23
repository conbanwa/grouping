const wx = {
    clearStorage: function() {
        localStorage.clear()
        z(localStorage.getItem('history'))
    },
    getStorageSync: function(key) {
        let value = localStorage.getItem(key)
        try {
            return JSON.parse(value)
        } catch (error) {
            x(error)
            return value
        }
    },
    setStorageSync: function(key, value) {
        // $.cookie(key,JSON.stringify(value), { expires: 999, path: '/' })
        z(value)
        localStorage.setItem(key, JSON.stringify(value))
            // z(value)
            // z(JSON.stringify(value))
            // z(localStorage.getItem(key))
    }
}
const app = {
    initcache: function(key, def) {
        try {
            if (app.get(key) == null) {
                app.set(key, def)
                return def
            } else {
                return app.get(key)
            }
        } catch (error) {
            x(error, key, def)
            return def
        }
    },
    set: function(key, value) {
        try {
            wx.setStorageSync(key.toString(), value)
        } catch (e) {
            x(e)
        }
    },
    get: function(key) {
        try {
            let value = wx.getStorageSync(key.toString())
                // if (value) {
            return value
                // }
        } catch (e) {
            x(key, e)
        }
    },
    addarr: function(arr, item) {
        let list = app.get(arr) || []
        if (list.indexOf(item) > -1) return;
        list.push(item)
        app.set(arr, list)
    },
    delarr: function(arr, item) {
        let list = app.get(arr)
        if (!list) return;
        app.remove(list, item)
        app.set(arr, list)
    },
    // staritem: function(e){
    //   app.addarr(('starreward'),e)
    // },
    // unstaritem: function(e){
    //  app.delarr(('starreward'),e)
    // },
    remove: function(arr, item) {
        if (!arr) return;
        let i = arr.length
        while (i--) {
            if (arr[i] == item) {
                arr.splice(i, 1)
            }
        }
    },
}