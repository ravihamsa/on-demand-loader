(function (root) {

    var body = document.getElementById('cardsContainer');
    var dragThreshold = 37;
    var tapThreshold = 0;

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
            var tapHappened = absX <= tapThreshold && absY <= tapThreshold;

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
            }else if(tapHappened){
                eventType = 'tap';
            }

            if(eventType !== ''){
                var event = new CustomEvent(eventType, {
                    detail:{
                        target:touchEvent.target,
                        endTarget:touchEndEvent.target
                    },
                    bubble:true,
                    cancelable:true
                })
                document.body.dispatchEvent(event);
                console.log(eventType, xDif, yDif, xChanged, yChanged, touchEvent.target);
            }

            body.removeEventListener('touchend', checkAndTriggerSwipe);
        }



        body.addEventListener('touchend', checkAndTriggerSwipe)


    });




})(window)