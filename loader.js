(function(root){
    function Promise() {
        var callbacks = [],
            promise = {
                resolve: resolve,
                reject: reject,
                then: then,
                safe: {
                    then: function safeThen(resolve, reject) {
                        promise.then(resolve, reject);
                    }
                }
            };

        function complete(type, result) {
            promise.then = type === 'reject'
                ? function (resolve, reject) { reject(result); }
                : function (resolve) { resolve(result); };

            promise.resolve = promise.reject = function () { /*do nothing*/ };

            var i = 0, cb;
            while (cb = callbacks[i++]) { cb[type] && cb[type](result); }

            callbacks = null;
        }

        function resolve(result) {
            complete('resolve', result);
        }

        function reject(err) {
            complete('reject', err);
        }

        function then(resolve, reject) {
            callbacks.push({ resolve: resolve, reject: reject });
        }

        return promise;
    }

    var promiseIndex = {};
    var getPromise = function(url){
        var promise = promiseIndex[url];
        if(!promise){
            promise = new Promise();
        }
        return promise;
    }

    var getData = function(url, callback){
        var xmlHTTP = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("MicrosoftXMLHTTP");
        var promise =  getPromise(url);
        xmlHTTP.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                promise.resolve(this.responseText);
                if(callback){callback(this.responseText);}
            }

        }
        xmlHTTP.open("GET", url, true);
        xmlHTTP.send();
        return promise;
    }

    var count = 10, currentIndex = 0, loadedIndex = 0, threshold = 5, onLoaded = function(){},
        getUrl = function(){
            return 'data/data-'+loadedIndex+'-'+(loadedIndex+count)+'.json'
        },
        loadNextData = function(){
            var promise = getData(getUrl());
            promise.then(function(resp){
                loadedIndex += count;
                onLoaded(resp)
            })
        },
        checkBackgroundLoad = function(){
            if(loadedIndex - currentIndex < threshold){
                loadNextData()
            }
        },
        bumpUpIndex = function(){currentIndex++; checkBackgroundLoad()},
        bumpDownIndex = function(){if(currentIndex>0)currentIndex--;}



    root.loader = {
        init:function(mediator){
            onLoaded = mediator.onLoaded;
            mediator.bumpUpIndex = bumpUpIndex;
            mediator.bumpDownIndex = bumpDownIndex;
            checkBackgroundLoad();
        },
        logIndex: function(){
            console.log(currentIndex, loadedIndex, threshold);
        }
    }
})(window)



