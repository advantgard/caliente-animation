//
// Description: A plugin that handles animations and interactions on the Russia World Cup hero
// Dependencies: jQuery
// Author: Jorge Alvarez
// Email: j.alvarz@hotmail.com
//

$( function () {

    var pub = {};

    /**
     * Settings
     */

    var animationLength = 500;
    var animationRepeatTimes = 2;

    /**
     *  Selectors
     */

    var $interactiveClips = $('[data-interactive-clip]');
    var $interactiveButtons = $('[data-interactive-button]');

    var $glow = $interactiveClips.children('[data-glow]');

    /**
     * Async function: Adds blink effect to an element
     * @param $element (required): The selector of the element
     * @param index: Used for asynchronous loop, current element in the animation queue
     * @param callback: Callback function to execute when animation is complete
     */
    pub.blink = function ($element, index, callback) {

        var times = index || 0;
        var next = callback || function() {};

        $element
            .animate({opacity: 1}, animationLength, function () {
                $element.animate({opacity: 0}, animationLength, function () {
                    if(!((times + 1) >= animationRepeatTimes)) {
                        pub.blink($element, times += 1, next);
                    } else {
                        next();
                    }
                });
            });

    };

    pub.loopAnimation = function ($elements, index) {

        var current = index || 0;

        pub.blink($($elements[current]), 0, function () {
            pub.blink($($elements[current + 1]));
        });

    };

    /**
     * Main entry point
     */
    pub.init = function () {
        $glow.on("mouseover", function () {
            $glow.finish();
        });
        pub.loopAnimation($glow);
    };

    pub.init();

});