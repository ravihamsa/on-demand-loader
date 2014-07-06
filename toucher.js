(function (root) {

    var body = document.body;
    var dragThreshold = 50;

    body.addEventListener('touchstart', function (touchEvent) {
        var changedTouche = touchEvent.changedTouches[0];
        var screenX = changedTouche.screenX;
        var screenY = changedTouche.screenY;

        var checkAndTriggerSwipe = function(touchEndEvent){
            var endChangedTouche = touchEndEvent.changedTouches[0];
            var endScreenY = endChangedTouche.screenY;
            var endScreenX = endChangedTouche.screenX;

            var xDif = screenX - endScreenX;
            var yDif = screenY - endScreenY;

            var absX = Math.abs(xDif);
            var absY = Math.abs(yDif);

            var xChanged = absX > dragThreshold && absX >= absY;
            var yChanged = absY > dragThreshold && absY > absX;

            var eventType = '';
            if(yChanged){
                if(yDif > 0){
                    eventType = 'swipeup';
                }else{
                    eventType = 'swipedown';
                }

            }else if(xChanged){

                if(xDif > 0){
                    eventType = 'swipeleft';
                }else{
                    eventType = 'swiperight';
                }
            }

            if(eventType !== ''){
                var event = new CustomEvent(eventType, {
                    detail:{
                        target:touchEvent.target
                    },
                    bubble:true,
                    cancelable:true
                })
                body.dispatchEvent(event);
                console.log(eventType, xDif, yDif, xChanged, yChanged);
            }

            body.removeEventListener('touchend', checkAndTriggerSwipe);
        }

        body.addEventListener('touchend', checkAndTriggerSwipe)

    });


})(window)