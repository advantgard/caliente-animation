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

    /**
     * Async function: Loops through clip elements on the banner
     * @param $elements: Array of selectors for the clips
     * @param index
     */
    pub.loopAnimation = function ($elements, index) {

        var current = index || 0;

        pub.blink($($elements[current]), 0, function () {

            pub.blink($($elements[5]));
            pub.blink($($elements[current + 1]), 0, function () {
                pub.blink($($elements[current + 2]), 0, function () {
                    pub.blink($($elements[current + 3]), 0, function () {
                        pub.blink($($elements[current + 4]));
                    })
                })
            });

        });

    };

    pub.loopButtonsAnimation = function () {
        $($interactiveButtons[0]).toggleClass("hovered");
        setTimeout(function () {
            $($interactiveButtons[0]).toggleClass("hovered");
            $($interactiveButtons[1]).toggleClass("hovered");
        }, 1000);
        setTimeout(function () {
            $($interactiveButtons[1]).toggleClass("hovered");
            $($interactiveButtons[2]).toggleClass("hovered");
        }, 2000);
        setTimeout(function () {
            $($interactiveButtons[2]).toggleClass("hovered");
            $($interactiveButtons[3]).toggleClass("hovered");
        }, 3000);
        setTimeout(function () {
            $($interactiveButtons[3]).toggleClass("hovered");
            $($interactiveButtons[4]).toggleClass("hovered");
        }, 4000);
        setTimeout(function () {
            $($interactiveButtons[4]).toggleClass("hovered");
        }, 5000);
    };

    /**
     * Main entry point
     */
    pub.init = function () {
        $glow.on("mouseover", function () {
            $glow.finish();
        });
        if(window.innerWidth < 768) {
            pub.loopButtonsAnimation();
        } else {
            pub.loopAnimation($glow);
        }
    };

    pub.init();

});