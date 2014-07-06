(function (root) {
    var JSONPCounter = 0;
    var getData = function (url, callback) {
        var xmlHTTP = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("MicrosoftXMLHTTP");
        xmlHTTP.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (callback) {callback(this.responseText);}
            }
        }
        xmlHTTP.open("GET", url, true);
        xmlHTTP.send();
    }

    var loadJSONP = function(url){
        var script = document.createElement('script'),
            done = false;
        script.src = url;
        script.async = true;

        script.onload = script.onreadystatechange = function() {
            if ( !done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") ) {
                done = true;
                script.onload = script.onreadystatechange = null;
                if ( script && script.parentNode ) {
                    script.parentNode.removeChild( script );
                }
            }
        };

        var head = document.getElementsByTagName('head')[0];
        head.appendChild( script );
    }
    var getDataJSONP = function(url, callback){
        var uniqueName =   'hbcb';
        window[ uniqueName ] = function(data){
            callback(data);
        }
        loadJSONP(url+'&callback='+uniqueName);
    }

    var count = 10, currentIndex = 0, loadedIndex = 0, threshold = 5, onLoaded = function () {},
        getUrl = function () {
            return '/appdata?start='+(loadedIndex+1)+'&count='+count
        },
        loadNextData = function () {
            getDataJSONP(getUrl(), function(resp){
                loadedIndex += count;
                onLoaded(resp)
            });
        },
        checkBackgroundLoad = function () {
            if (loadedIndex - currentIndex < threshold) {
                loadNextData()
            }
        },
        bumpUpIndex = function () {
            currentIndex++;
            checkBackgroundLoad()
        },
        bumpDownIndex = function () {if (currentIndex > 0)currentIndex--;}


    root.loader = {
        init: function (mediator) {
            onLoaded = mediator.onLoaded;
            mediator.bumpUpIndex = bumpUpIndex;
            mediator.bumpDownIndex = bumpDownIndex;
            checkBackgroundLoad();
        },
        logIndex: function () {
            console.log(currentIndex, loadedIndex, threshold);
        }
    }
})(window)



