$( function () {

    var pub = {};

    /**
     *  Selectors
     */

    var $interactiveClips = $('[data-interactive-clip]');
    var $interactiveButtons = $('[data-interactive-button]');

    var $glow = $interactiveClips.children('[data-glow]');

    /**
     * Adds glow animation to element
     * @param element
     */
    pub.animate = function (element) {

    };

    /**
     * Main entry point
     */
    pub.init = function () {
        $glow.on('hover', function () {
            $('this').animate({ opacity: 1 }, 500);
        });
    };

    pub.init();

});