(function (window) {

    var mraidAvail = false;
    var DISPLAY = 'display', BLOCK = 'block', NONE = 'none', WEB_KIT_TRANSFORM = '-webkit-transform', VISIBILITY = 'visibility', HIDDEN = 'hidden', VISIBLE = 'visible', INDEX = 'index';
    var documentReference = document, mraid = window.mraid,
        querySelector = function (selector, parentNode) {
            if (!parentNode) {
                parentNode = documentReference
            }
            return parentNode.querySelector(selector)
        },
        setStyle = function (node, styleAttribute, styleValue) {
            node.style[styleAttribute] = styleValue;
        }, showNode = function (node) {
            setStyle(node, DISPLAY, BLOCK);
        }, hideNode = function (node) {
            setStyle(node, DISPLAY, NONE);
        }, nodeVisible = function (node) {
            setStyle(node, VISIBILITY, VISIBLE)
        }, setTransform = function (node, styleValue) {
            setStyle(node, WEB_KIT_TRANSFORM, styleValue);
        }, nodeHidden = function (node) {
            setStyle(node, VISIBILITY, HIDDEN)
        }, getElementById = function (id) {
            return documentReference.getElementById.call(documentReference, id);
        }, createElement = function (tagName) {
            return documentReference.createElement.call(documentReference, tagName);
        }, getInteger = function (value) {
            return parseInt(value, 10);
        }, getFloat = function (value) {
            return parseFloat(value);
        }, getAttribute = function (node, attributeName) {
            return node.getAttribute(attributeName);
        }, getCardIndex = function (node) {
            getInteger(getAttribute(INDEX));
        };


    var boxleft,
        starty,
        dist = 0, // distance traveled by touch point
        touchobj = null;


    var currentCard = null;
    var GLOBAL_COUNTE = 1;


    var MAIN_HEIGHT = 360; //Hardocded now


    var deckLock = null;

    var cardsLength, maxCardIndex, minCardIndex;
    var allCards;
    var maxZ = 3;
    var mediumZ = 1;
    var minZ = 0;
    var currentDeckLocation;
    var currentCategory;
    var timeStayed;
    var storyBoardArr = [];
    var completed = false;


    function collapse() {
        mraid.close();
    }

    /*function expand(){
     // alert(1);
     mraid.setExpandProperties(mraid_getProps());
     mraid.expand(null);
     }*/
    function scaffold() {
        if (currentCard) {
            timeStamp1 = new Date().getTime();
            var currentFlipper = querySelector(currentCard, '.flipper');
            //currentFlipper.style['-webkit-transform']="rotateY(180deg)";
            showNode(querySelector(documentReference, '.shadow.one'));
            showNode(querySelector(documentReference, '.shadow.two'));
            setTimeout(function () {
                setTransform(currentCard, 'translate3d(0, -' + MAIN_HEIGHT + 'px,' + maxZ + 'px) scale(1)');
                //currentCard.style.WebkitTransform = 'translate3d(0, -'+ MAIN_HEIGHT+'px,'+maxZ+'px) scale(1)';
                setTimeout(function () {
                    setTransform(currentFlipper, 'rotateY(-200deg)')
                    //currentFlipper.style['-webkit-transform']="rotateY(-200deg)";
                    setTimeout(function () {
                        setTransform(currentFlipper, 'rotateY(0deg)')
                        //currentFlipper.style['-webkit-transform']="rotateY(0deg)";
                    }, 800);
                }, 1000);
                nodeVisible(bottomDeck)
            }, 500);

        }
    }


    var data = [];


//------------------------

    var bodyHeight, bodyWidth;
    var body = document.body;
//var banner  = getElementById("banner");
    var fullViewDiv = getElementById("fullview");
    var headerDiv = getElementById("header");
    var deckWrapperDiv = getElementById("deck_wrapper");
    var bottomDeck = getElementById('bottomdeck');
    var recordCount = 0;
    var startCardIndex;// = getInteger((recordCount-1)/2) + 1, idbase = "card-";
    var totalCount = 0;
    var storyBoardId = 1;
    var timeStamp1;

    function resizeBody() {
        if (typeof mraidAvail != "undefined" && mraidAvail) {
            var dimensions = mraid.getScreenSize();

            bodyWidth = dimensions.width;
            bodyHeight = dimensions.height;

        }
        else {
            bodyWidth = window.innerWidth;
            bodyHeight = window.innerHeight;
        }
        if (bodyWidth >= 320 && bodyHeight <= 480) {
            bottomDeck.style.height = "330px";
            bottomDeck.style.top = "330px";
            MAIN_HEIGHT = 330;
            touchIdentifierDistance = 35;

        }
        else if (bodyHeight === 568) {


            bottomDeck.style.height = "400px";
            bottomDeck.style.top = "400px";
            MAIN_HEIGHT = 400;
            touchIdentifierDistance = 35;
        }
        else if (bodyHeight === 640) {
            // alert("Reached 3 ");
            bottomDeck.style.height = "480px";
            bottomDeck.style.top = "490px";
            MAIN_HEIGHT = 490;
        }
        body.style.width = deckWrapperDiv.style.width = fullViewDiv.style.width = bodyWidth + "px";

        //fullViewDiv.style.height = bodyHeight + "px";

        deckWrapperDiv.style.height = (bodyHeight ) + "px";
    }

    function checkForValidation(obj) {
        if (obj.price === undefined || obj.price == 0) {
            obj.price = "Free";
        } else {
            obj.price = '$' + obj.price;
        }
        if (obj.name.length > 20) {
            obj.name = obj.name.substr(0, 17).concat('...');
        }
        if (!obj.tags[0]) {
            obj.tags[0] = "";
        }

    }

    function renderCard(datasection, append, oldLength) {

        var template = getElementById("card");
        var ele = createElement('div');

        var templateString = "", item, index, location, cardString = "", templateEndString = "</div>";
        for (var i = 0; i < items.length; i++) {
            checkForValidation(items[i]);
            //items[i].name = items[i].name.substr(0,8);
            item = items[i];

            var smallImageString = "";

            item['background_image'] = item.background_images[0];


            var ratingstar = '';
            var startype = 'full';

            var star_int = getInteger(item['rating']);


            var stars = getFloat(item['rating']) - getFloat(star_int);
            var halfStar = false;

            for (var j = 0; j < 5; j++) {
                if (j < star_int) {
                    ratingstar += "<span class = 'star full'>&#9733;</span>";
                } else {
                    if (!halfStar && stars !== getFloat(0)) {
                        halfStar = true;
                        ratingstar += "<span class = 'star half'>&#9733;</span>";
                    } else {
                        ratingstar += "<span class = 'star'>&#9733;</span>";
                    }
                }

            }

//                       if(stars!==getFloat(0)){
////                           star_int = star_int -1;
//                           ratingstar += "<span class = 'star half'>&#9733;</span>"
//                       }

            item['ratingstar'] = ratingstar;

            var bgImageString = "", showTransparentImg = true;

            if (append) {
                location = "bottom"
            }
            else {
                if (i <= startCardIndex) {
                    location = "top";
                    if ((i == startCardIndex) || (i == getPreviousIndex(startCardIndex) )) {
                        bgImageString = "background-image: url('" + item.background_image + "');background-repeat:no-repeat";
                        showTransparentImg = false;
                    }
                }
                else {
                    if ((i == getNextIndex(startCardIndex)) || (i == getNextIndex(getNextIndex(startCardIndex)) )) {
                        bgImageString = "background-image: url('" + item.background_image + "');background-repeat:no-repeat";
                        showTransparentImg = false;
                    }
                    location = "bottom";
                }
            }
            var activeimageclass = "";
            for (var j = 0; j < item.background_images.length; j++) {
                var smallImgURL = "src='" + item.background_images[j] + "'";
                activeimageclass = "";
                if (j == 0) {
                    activeimageclass = "imgactive";
                }
                smallImageString += "<img class='smallImg " + activeimageclass + "' " + smallImgURL + " ontouchstart='smallImageTouchStart(event,this)'/>";
            }
            item['smallImgContent'] = smallImageString;
            var review_contents = "Awesome Game !!! Must Buy !!"
            cardString = "<div class='flip-container'> <div class='flipper'> <div class='front'><div class='topContainer'><div class='leftContainer'><div class='appLogo' style='background-image: url(" + item.icon_url + ")'></div><div class='appName'>" + item.name + "</div><div class='smallName'>" + item.publisher + "</div><div class='install'></div><div class='count'>" + item.installs + "</div></div><div class='rightContainer'><div class='rating'>" + ratingstar + "</div><div class='category'>" + item.category + "</div></div></div><div class='middleContainer'><img class='backGround_img' src='" + item.background_image + "'> <div class='smallImgCont'>" + smallImageString + "</div> </div><div class='bottomContainer'><div class='info' ontouchend=deckOnTouchMove(event,this," + i + ",'left') ></div><div class='tag'>" + item.tags[0] + "</div><div class='price' ontouchend=openInstall('" + item.tracking_url + "',this)><div class='dowloadIcon'></div>  <span class='app_price'>" + item.price + "</span> Install</div></div></div><div class='back'> <div class='gradback'> <div class='topContainer'><div class='leftContainer'><div class='appLogo' style='background-image: url(" + item.icon_url + ")'></div><div class='appName'>" + item.name + "</div><div class='smallName'>" + item.publisher + "</div><div class='install'></div><div class='count'>" + item.installs + "</div></div><div class='rightContainer'><div class='rating'>" + ratingstar + "</div><div class='category'>" + item.category + "</div></div></div> <div class='desc-container'> <div class='desc-title'> Description </div> <div class='desc-body'> " + item.description + " </div> <div class='desc-title'> Reviews </div><div class='rating-title'> 1. Very Nice </div>  <div class='review_rating'><div class='rating_revire'> " + ratingstar + " by Anubhav 12:23:44</div> <div class='review_content'>" + review_contents + "</div> </div>   <div class='rating-title'> 2. Very Nice </div> <div class='review_rating'><div class='rating_revire'> " + ratingstar + " by Anubhav 12:23:44 </div> <div class='review_content'>" + review_contents + "</div></div>        </div> <div class='bottomContainer' ><div class='info' ontouchend=deckOnTouchMove(event,this," + i + ",'right') ></div><div class='price' ontouchend=openInstall('" + item.tracking_url + "',this)>  <span class='app_price'> " + item.price + "</span> Install</div></div> </div>  </div> </div> </div>";
            if (append) {

                var newcard = createElement("div");

                newcard.className = "card";
                newcard.setAttribute("id", idbase + (oldLength + i));
                //newcard.style.visibility = 'hidden';
                newcard.setAttribute("index", (oldLength + i));
                newcard.setAttribute("data-location", "bottom");
                newcard.setAttribute("data-cat", item.category);
                newcard.setAttribute("ontouchstart", "deckOnTouchStart(event,this)");
                newcard.setAttribute("ontouchend", "deckOnTouchEnd(event,this)");
                newcard.setAttribute("ontouchmove", "deckOnTouchMove(event,this)");

                //ontouchend='deckOnTouchEnd(event, this)' ontouchmove='deckOnTouchMove(event, this)'class='card' id='"+ (idbase + i )+"' index="+i+" data-location=" + location+" data-cat="+ item.category + " >" );

                //debugger;
                newcard.innerHTML = cardString;
                bottomDeck.appendChild(newcard);
            }
            else {
                //debugger;
                templateString += "<div ontouchstart='deckOnTouchStart(event,this)' ontouchend='deckOnTouchEnd(event,this)' ontouchmove='deckOnTouchMove(event,this)'class='card' id='" + (idbase + i ) + "' index=" + i + " data-location=" + location + " data-cat=" + item.category + " style='xvisibility:hidden;'>" + cardString + templateEndString;
            }


        }

        if (!append && templateString) bottomDeck.innerHTML = "<div class='dummy'><div class='shadow one'></div><div class='shadow two'></div></div></div>" + templateString;

    }

    function preventDefault(e) {
        e.preventDefault();
    }


    function getPreviousIndex(index) {
        var prev = index - 1;
        if (prev < 0) {
            prev = maxCardIndex;
        }
        return  prev;
    }

    function getNextIndex(index) {
        var next = index + 1;
        if (next > maxCardIndex) {
            next = 0;
        }
        return next;
    }

    function renderDeck(firstcall) {

        allCards = bottomDeck.querySelectorAll(".card");
        cardsLength = allCards.length;
        if (cardsLength <= 0) return;
        minCardIndex = 0;
        maxCardIndex = cardsLength - 1;
        if (firstcall) {
            currentCard = allCards[startCardIndex];
            currentCategory = data[startCardIndex].category;

        }


    }

    function initializeCards() {
        var currentCardIndex = getCardIndex(currentCard);

        scaffold();


        var nextCard = allCards[getNextIndex(currentCardIndex)];
        setTransform(nextCard,'translate3d(0, 0px,' + maxZ + 'px) scale(.8)');

        var next2nextCard = allCards[getNextIndex(getNextIndex(currentCardIndex))];
        setTransform(next2nextCard,'translate3d(0, 0px,' + mediumZ + 'px) scale(.8)');

        var previousCard = allCards[getPreviousIndex(currentCardIndex)];
        setTransform(previousCard,'translate3d(0, -' + MAIN_HEIGHT + 'px,' + mediumZ + 'px) scale(1)');

        //currentCard.style.visibility = 'visible';
        //previousCard.style.visibility = 'visible';
        //nextCard.style.visibility = 'visible';
    }

    function shuffleCards() {

        var location = getAttribute(currentCard, 'data-location'), i = 0;
        var currentCardIndex = getCardIndex(currentCard);
        var card;
        var nextIndex = getNextIndex(currentCardIndex);
        var prevIndex = getPreviousIndex(currentCardIndex);
        for (var i = 0; i < cardsLength; i++) {
            card = allCards[i];

            if ((i == prevIndex) || (i == nextIndex) || (i == currentCardIndex)) {
                card.style.visibility = 'visible';
            }
            else {
                card.style.visibility = 'hidden';
            }

        }


        var nextCard = allCards[getNextIndex(currentCardIndex)];
        var next2nextCard = allCards[getNextIndex(getNextIndex(currentCardIndex))];

        var previousCard = allCards[getPreviousIndex(currentCardIndex)];
        var prev2prev = allCards[getPreviousIndex(getPreviousIndex(currentCardIndex))];


        if (location == "top") {


//            currentCard.style.WebkitTransform = 'translate3d(0px, -'+MAIN_HEIGHT+'px,'+maxZ+'px) scale(1)';
            //currentCard.setAttribute("data-location", "top");

            setTransform(currentCard,'translate3d(0px, -' + MAIN_HEIGHT + 'px,' + maxZ + 'px) scale(1)');
            setTransform(nextCard,'translate3d(0, 0px,' + maxZ + 'px) scale(.8)');


            setTransform(next2nextCard,'translate3d(0, 0px,' + mediumZ + 'px) scale(.8)');
            next2nextCard.setAttribute("data-location", "bottom");

//            alert(MAIN_HEIGHT);

            setTransform(previousCard,'translate3d(0, -' + MAIN_HEIGHT + 'px,' + mediumZ + 'px) scale(1)');

            setTransform(prev2prev,"translate3d(0, -" + MAIN_HEIGHT + "px, " + minZ + "px) scale(1)");


        }
        else if (location == 'bottom') {


            setTransform(currentCard,'translate3d(0px, 0px,' + maxZ + 'px) scale(.8)');
            //currentCard.setAttribute("data-location", "bottom");


            setTransform(nextCard,'translate3d(0px, 0px,' + mediumZ + 'px) scale(.8)');


            setTransform(prev2prev,'translate3d(0, -' + MAIN_HEIGHT + 'px,' + mediumZ + 'px) scale(1)');
            prev2prev.setAttribute("data-location", "top");

            setTransform(previousCard,'translate3d(0, -' + MAIN_HEIGHT + 'px,' + maxZ + 'px) scale(1)');

            setTransform(next2nextCard,'translate3d(0, 0px,' + minZ + 'px) scale(.8)');
        }
        /*return;
         cardsLength = allCards.length;
         if(location == "top"){
         while(i < cardsLength) {
         var card = allCards[i];
         var index = getInteger(card.getAttribute(node, "index"));



         //might break if length is <=3
         if(i == currentCardIndex){
         card.style.visibility =  'visible';
         card.style.WebkitTransform = 'translate3d(0, -'+MAIN_HEIGHT+'px,'+maxZ+'px) scale(1)';

         }
         else if(i == getNextIndex(currentCardIndex)){
         card.style.visibility =  'visible';
         card.style.WebkitTransform = 'translate3d(0, 0px,'+maxZ+'px) scale(.8)';
         card.setAttribute("data-location", "bottom");


         }
         else if( i == getPreviousIndex(currentCardIndex)){
         //debugger;
         card.style.WebkitTransform = 'translate3d(0, -'+MAIN_HEIGHT+'px,'+mediumZ+'px) scale(1)';
         card.setAttribute("data-location", "top");
         card.style.visibility =  'visible';

         }
         else if(i == getNextIndex(getNextIndex(currentCardIndex))){
         //card.style.visibility =  'hidden';
         card.style.WebkitTransform = 'translate3d(0, 0px,'+mediumZ+'px) scale(.8)';
         card.setAttribute("data-location", "bottom");

         }
         else{
         card.style.visibility =  'hidden';
         //card.style.WebkitTransform = 'translate3d(0, 0px,'+minZ+'px) scale(.8)';

         }
         i++;
         }
         }
         else if( location == "bottom"){
         while(i < cardsLength) {
         var card = allCards[i];
         var index = getInteger(card.getAttribute(node, "index"));

         //might break if length is <=3
         if(i == currentCardIndex){
         card.style.visibility =  'visible';
         card.style.WebkitTransform = 'translate3d(0, 0px,'+maxZ+'px) scale(.8)';

         }
         else if(i == getNextIndex(currentCardIndex)){

         card.style.WebkitTransform = 'translate3d(0, 0px,'+mediumZ+'px) scale(.8)';
         card.setAttribute("data-location", "bottom");
         card.style.visibility =  'visible';

         }
         else if( i == getPreviousIndex(currentCardIndex)){

         card.style.WebkitTransform = 'translate3d(0, -'+MAIN_HEIGHT+'px,'+maxZ+'px) scale(1)';
         card.setAttribute("data-location", "top");
         card.style.visibility =  'visible';

         }
         else if(i == getPreviousIndex(getPreviousIndex(currentCardIndex))){
         //card.style.visibility =  'hidden';
         card.style.WebkitTransform = 'translate3d(0, -'+MAIN_HEIGHT+'px,'+mediumZ+'px) scale(1)';
         card.setAttribute("data-location", "top");

         }
         else{
         card.style.visibility =  'hidden';
         //card.style.WebkitTransform = 'translate3d(0, 0px,'+minZ+'px) scale(.8)';

         }
         i=i+1;
         }
         }*/


    }

    var touchIdentifierDistance = 20;


    function loadSurroundingImages(cardObj) {
        var index = getCardIndex(cardObj);
        var prevIndex = getPreviousIndex(getPreviousIndex(index));
        var nextIndex = getNextIndex(getNextIndex(index));
        var previousFront = allCards[prevIndex].querySelector(".middleContainer img");
        var previousBack = allCards[prevIndex].querySelector(".back");

        var nextFront = allCards[nextIndex].querySelector(".middleContainer img");
        var nextBack = allCards[nextIndex].querySelector(".back");
        //debugger;
        var next = allCards[nextIndex];

        if (!previousFront.style.backgroundImage) {
            previousFront.src = data[prevIndex]["background_images"][0];
            //previousFront.style.backgroundImage =  "url('"+front-bg-img.png +"')" ; //front-bg-img.png   "url(" + data[prevIndex]["background_images"][0] + ")";

            // previousFront.style.backgroundRepeat = "no-repeat";
            // previousBack.style.backgroundImage ="url('"+front-bg-img.png +"')" ;// "url(" + data[prevIndex]["background_images"][0] + ")";

            previousBack.style.backgroundRepeat = "no-repeat";
            var smallImages = previousFront.querySelectorAll("img[imgsource]"), smallImage;
            for (var k = 0; k < smallImages.length; k++) {
                smallImage = smallImages[k];
                smallImage.setAttribute('src', getAttribute(smallImage, 'imgsource'));
            }
        }
        if (!nextFront.style.backgroundImage) {
            nextFront.src = data[prevIndex]["background_images"][0];
            // nextFront.style.backgroundImage = "url('"+front-bg-img.png +"')" ;//"url(" + data[prevIndex]["background_images"][0] + ")";

            //nextFront.style.backgroundRepeat = "no-repeat";
            // nextBack.style.backgroundImage = "url('"+front-bg-img.png +"')" ;//"url(" + data[prevIndex]["background_images"][0] + ")";

            //nextBack.style.backgroundRepeat = "no-repeat";
            var smallImages = nextFront.querySelectorAll("img[imgsource]"), smallImage;
            for (var k = 0; k < smallImages.length; k++) {
                smallImage = smallImages[k];
                smallImage.setAttribute('src', getAttribute(smallImage, 'imgsource'));
            }
        }
    }

    function deckOnTouchStart(e, cardObj) {
        e.preventDefault();
        var index = getAttribute(cardObj, "index");


        deckLock = 0;
        var location = cardObj.intialLocation = getAttribute(cardObj, 'data-location');

        touchobj = e.changedTouches[0];
        cardObj.clientY = getInteger(touchobj.clientY);
        cardObj.clientX = getInteger(touchobj.clientX);


        currentCard = cardObj;
        /*var previousCard = allCards[getPreviousIndex(index)];
         var nextCard = allCards[getNextIndex(index)];
         if(location == "top"){
         previousCard.style.visibility = 'visible';
         }
         else if(location == "bottom"){
         nextCard.style.visibility = 'visible';
         }*/
    }

    function deckOnTouchMove(e, cardObj, info, type) {
        if (deckLock === 1) {
            return;
        }
        if (info !== undefined) {
            cardObj = getElementById("card-" + info);

        }

        touchobj = e.changedTouches[0];
        var distV = getInteger(touchobj.clientY) - cardObj.clientY, distH;
        var location = getAttribute(cardObj, "data-location");
        if (location == "top" || info === 1) { //flip + swipedown enabled
            distH = getInteger(touchobj.clientX) - cardObj.clientX;
            var currentFlipper = cardObj.querySelector('.flipper');
            var ind = getCardIndex(currentCard);
            if (distH > touchIdentifierDistance || (info !== undefined && type === "left")) {
                deckLock = 1;

                setTransform(currentFlipper,"rotateY(0deg)");

                var currentRorateY = getAttribute(currentFlipper, "rotateY") || 0;
                currentRorateY = getInteger(currentRorateY);
                var nextRotateY = (currentRorateY - 180);
                setTransform(currentFlipper,"rotateY(" + nextRotateY + "deg)");
                currentFlipper.setAttribute("rotateY", nextRotateY);
                var deg = getInteger(getAttribute(currentCard.querySelector('.flipper'), 'rotatey')) / 180;
                if (deg % 2 !== 0) {
                    sendHit(99, {"action": "details_show", "label": getCurrentAppDataString(ind)});
                }

            }
            else if (distH < -touchIdentifierDistance || (info !== undefined && type === "right")) {
                deckLock = 1;
                var currentRorateY = getAttribute(currentFlipper, "rotateY") || 0;
                currentRorateY = getInteger(currentRorateY);
                var nextRotateY = (currentRorateY + 180);
                setTransform(currentFlipper,"rotateY(" + nextRotateY + "deg)");
                currentFlipper.setAttribute("rotateY", nextRotateY);
                var deg = getInteger(getAttribute(currentCard.querySelector('.flipper'), 'rotatey')) / 180;
                if (deg % 2 !== 0) {
                    sendHit(99, {"action": "details_show", "label": getCurrentAppDataString(ind)});
                }


            }
            else if (distV > touchIdentifierDistance) {
                deckLock = 1;
                cardObj.setAttribute('data-location', "bottom");

                shuffleCards();
                var index = getCardIndex(cardObj);
                var category = data[index].category;
//                if(category != currentCategory){
//                    currentCategory = category;
//                    showCategory();
//                }

            }
            else if ((distV > 0) && (distV < touchIdentifierDistance)) {
                setTransform(cardObj,'translate3d(0px, -' + (MAIN_HEIGHT - distV) + 'px,' + maxZ + 'px) scale(1)');
            }


        }
        else if (location == "bottom") { //onlyswipe up
            if (distV < -touchIdentifierDistance) {
                deckLock = 1;
                cardObj.setAttribute('data-location', "top");

                shuffleCards();
                var index = getCardIndex(cardObj);
                var category = data[index].category;
//                if(category != currentCategory){
//                    currentCategory = category;
//                    showCategory();
//                }

            }
            else if (( distV < 0) && (distV > -touchIdentifierDistance)) {
                //deckLock = 1;
                //cardObj.setAttribute('data-location', "bottom");

                setTransform(cardObj, 'translate3d(0px, ' + (distV) + 'px,' + maxZ + 'px) scale(.8)');
            }
            /*else if(( distV > 0) && (distV <  20)){
             //deckLock = 1;
             //cardObj.setAttribute('data-location', "bottom");

             cardObj.style.WebkitTransform = 'translate3d(0px, '+distV+'px,'+maxZ+'px) scale(.8)';
             }*/
            //console.log(distV);
        }

        /*return;
         console.log(distV);
         console.log(cardObj.clientY);
         //loadSurroundingImages(cardObj);

         if(location == "top" ){
         var currentFlipper = cardObj.querySelector('.flipper');
         if( distV > touchIdentifierDistance){
         deckLock = 1;
         cardObj.setAttribute('data-location', "bottom");
         }
         else if( distH > touchIdentifierDistance){
         deckLock = 1;

         currentFlipper.style['-webkit-transform']="rotateY(0deg)";

         var currentRorateY = currentFlipper.getAttribute(node, "rotateY") || 0;
         currentRorateY = getInteger(currentRorateY);
         var nextRotateY = (currentRorateY-180);
         currentFlipper.style['-webkit-transform']="rotateY(" + nextRotateY + "deg)";
         currentFlipper.setAttribute("rotateY", nextRotateY);

         }
         else{
         if( distH < -touchIdentifierDistance){
         deckLock = 1;
         var currentRorateY = currentFlipper.getAttribute(node, "rotateY") || 0;
         currentRorateY = getInteger(currentRorateY);
         var nextRotateY = (currentRorateY + 180);
         currentFlipper.style['-webkit-transform']="rotateY(" + nextRotateY + "deg)";
         currentFlipper.setAttribute("rotateY", nextRotateY);


         }
         }


         }
         else if(location == "bottom"){

         if(distV < -touchIdentifierDistance){
         deckLock = 1;
         cardObj.setAttribute('data-location', "top");
         }
         }*/

    }

    /*function animateBottomCard(card, counter){
     if(counter > 40) {
     animateBottomCard1(card, 1);
     return;
     }
     card.style.WebkitTransform = 'translate3d(0px, -'+counter+'px,'+maxZ+'px) scale(.8)';
     console.log(counter);
     setTimeout(function(){
     animateBottomCard(card, (counter+1));
     }, 10);
     }
     function animateBottomCard1(card, counter){
     if(counter > 40) return;
     card.style.WebkitTransform = 'translate3d(0px, '+counter+'px,'+maxZ+'px) scale(.8)';
     console.log(counter);
     setTimeout(function(){
     animateBottomCard(card, (counter+1));
     }, 10);
     }
     */
    function calculateTimeStamp(diff, cardObj) {

        var ind = getCardIndex(currentCard);
        if (cardObj.intialLocation === "bottom") {
            ind = getPreviousIndex(ind);
            sendHit(99, {"action": "card_session", "value": diff, "label": getCurrentAppDataString(ind)});
        } else if (cardObj.intialLocation === "top") {
            ind = getNextIndex(ind);
            sendHit(99, {"action": "card_session", "value": diff, "label": getCurrentAppDataString(ind)})
        }
    }

    function deckOnTouchEnd(e, cardObj) {
        deckLock = 0;
        cardObj.finalLocation = getAttribute(cardObj, 'data-location');
        var currentCardLocation = getAttribute(cardObj, 'data-location');
        if (cardObj.finalLocation != cardObj.intialLocation) {
            loadSurroundingImages(cardObj);
            var diff = new Date().getTime() - timeStamp1;
            calculateTimeStamp(diff, cardObj);
            timeStamp1 = new Date().getTime();
            /*var index = getInteger(cardObj.getAttribute(node);
             var counter = 0;
             card = allCards[getNextIndex(index)];
             animateBottomCard(card, 1);*/
        }
        else if (currentCardLocation == 'bottom') {
            setTransform(cardObj,'translate3d(0px, 0px,' + maxZ + 'px) scale(.8)');
        }
        else if (currentCardLocation == 'top') {
            setTransform(cardObj,'translate3d(0px, -' + MAIN_HEIGHT + 'px,' + maxZ + 'px) scale(1)');
        }

    }


    function hbcb(serverdata) {
        if (serverdata && serverdata.completed) {
            completed = serverdata.completed;
        }

        if (serverdata && serverdata.storyboardLength > 0) {
            var oldLength = data.length;
            data = data.concat(serverdata.storyboard);
            storyBoardArr.push(serverdata.storyboardId);
            recordCount += serverdata.storyboardLength;
            startCardIndex = 2, idbase = "card-";
            completed = serverdata.completed;
            renderCard(serverdata.storyboard, (storyBoardArr.length != 1 ), oldLength);
            renderDeck(storyBoardArr.length === 1);
            showAd();
        }
    }


    function getData() {
        if (completed) return;
        var script = getElementById('datascript');
        if (!script) {
            script = createElement('script');
            script.setAttribute('id', 'datascript');
            script.setAttribute('async', true);
            document.body.appendChild(script);
        }
        script.src = 'http://heisenberg-server.wc1.inmobi.com/appdata?os=ios&usedSIds=' + storyBoardArr.join(',');
    }

    getData();
// for multiple image catagery

//---------------------------------------------------------------

    function getCurrentAppDataString(index) {
        var currentData = data[index]
        return [storyBoardId, currentData.appid, currentCategory, index].join(',');
//        str.push(storyBoardId);
//        str.push(currentData.appid);
//        str.push(currentCategory);
//        str.push(index);
//        return str.join(',');

    }

    function smallImageTouchStart(event, element) {
        if (deckLock == 1) { return;}
        if (event.target.src === undefined) {
            return;
        }
        if (getAttribute(currentCard, 'data-location') == "bottom") return;
        //currentCard.querySelector('.front').classList.add("opacityAnimateHide");
        var allImages = currentCard.querySelectorAll(".smallImgCont img");
        for (var j = 0; j < allImages.length; j++) {
            allImages[j].className = allImages[j].className.replace(/imgactive/, "").replace("  ", " ");
        }


        element.className += " imgactive";
        if (deckLock == 1) { return;}
        currentCard.querySelector('.middleContainer img').src = event.target.src;
        sendHit(99, {"action": "thumbnail_click", "label": getCurrentAppDataString(getCardIndex(currentCard))});
    }


    function openInstall(url, obj) {
        url.replace("$IMP_ID", impId);
        url.replace("$UID", deviceId);
        url.replace("$IDA", deviceId);
        if (deckLock == 1) { return;}


        sendHit(8);
        setTimeout(function () {
            if (deckLock == 1) { return;}
            obj.className += " scalOpac";
            mraid.openExternal(url);
            obj.className = obj.className.replace(/scalOpac/g, "").replace("  ", " ");
        }, 500);
    }

    function showAd() {

        showNode(fullViewDiv);
        timeStayed = new Date().getTime();
        sendHit(18);
        resizeBody();
        initializeCards();

    }

    function onMraidReady() {
        if (typeof mraid.useCustomClose === "function") {
            mraid.useCustomClose(true);
        }
        //Wait for the ad to become visible for the first time
        if (typeof mraid.isViewable === "function" && mraid.isViewable()) {
            showAd();
        } else {
            mraid.addEventListener("viewableChange", function (viewable) {
                if (viewable) {
                    mraid.removeEventListener("viewableChange", arguments.callee);
                    showAd();
                }
            });
        }
        mraid.addEventListener("stateChange", function (state) {
            if (state == "hidden") {

                timeStayed = (new Date().getTime() - timeStayed) / 1000;
                sendHit(3, {"secs": timeStayed});

            }
        });
    }

    var count = 0;

    function checkForMraid() {
        count++;
        if (4 !== count) {
            if ("undefined" !== typeof mraid) {
                mraidAvail = true;
                if (mraid.getState() === "loading") {
                    mraid.addEventListener("ready", onMraidReady);
                } else {
                    onMraidReady();
                }
            } else {
                setTimeout(checkForMraid, 500);
            }
        } else {
            showAd();
        }
    }

    function sendHit(id, extraParams) {
        var params = {"spid": "hw-P3YL4Q1JYRZ3eABld", "src": "handwritten"};
        if (id === 99 || id === 3) {
            for (var key in extraParams) {
                if (extraParams.hasOwnProperty(key)) {
                    params[key] = extraParams[key];
                }
            }
        } else if (id === 8) {
            params["cta"] = "exit", params["ctaid"] = "click", params["it"] = "1", params["as"] = "1.0.0";
        }
        recordEventFun(id, params);
    }

    var impId = "$first.adImpressionId";

    function getDeviceId() {
        var rawHtml = document.documentElement.innerHTML;
        var regEx = /cocaineId\=(.+)\&extraId\=extraValue/;
        var matches = regEx.exec(rawHtml),
            deviceId = "";
        if (matches && matches.length > 0) {
            deviceId = matches[1];
        }
        return deviceId;
    }

    var deviceId = getDeviceId();


    window['im_3432_recordEvent'] = function (id, params) {
        var firePixel = function (source, retryTime, times) {
            if (times <= 0) {
                return;
            }
            var clickTarget = getElementById('im_3432_clickTarget');
            var img = createElement('img');
            img.setAttribute('src', source);
            img.setAttribute('height', '0');
            img.setAttribute('width', '2');
            if (img['addEventListener'] != undefined) {
                img.addEventListener('error', function () {
                    window.setTimeout(function () {
                        if (retryTime > 300000) {
                            retryTime = 300000;
                        }
                        firePixel(source, retryTime * 2, times - 1);
                    }, retryTime + Math.random());
                }, false);
            }
            //clickTarget.appendChild(img);
        };
        var beacon = "http://xyz.inmobi.com/1x1";
        beacon += "?m=" + id;
        if (params) {
            for (var key in params) {
                beacon += "&" + encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
            }
        }
        firePixel(beacon, 1000, 5);
        /*if (id == 18) {
         window['im_5738_impressionCallback']();
         }
         if (id == 8) {
         window['im_5738_clickCallback'](event);
         }*/
    };
    var recordEventFun = window["im_3432_recordEvent"];

    checkForMraid();
    sendHit(1);
    showAd();
    window.deckOnTouchStart = deckOnTouchStart();
    window.deckOnTouchMove = deckOnTouchMove();
    window.deckOnTouchEnd = deckOnTouchEnd();
})(window)