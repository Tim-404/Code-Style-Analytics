/**
 * @constructor Constructs a CustomAnimation object that stores the duration, timing, and effect of the
 * animation.
 * @param {function} timing a function that takes in a value 0 <= x <= 1 that returns the progress of the
 * animation
 * @param {function} draw a function that takes in a value representing the progress of the animation and 
 * translates it into action on the webpage
 * @param {number} duration the duration of the animation in milliseconds
 */
function CustomAnimation(timing, draw, duration) {
    this.timing = timing;
    this.draw = draw;
    this.duration = duration;
}

/**
 * Runs a CustomAnimation through the requestAnimationFrame callback.
 * @param {CustomAnimation} param0 the CustomAnimation object
 * @returns the id of the animation to use for cancellation
 */
function animate({timing, draw, duration}) {

    let start = performance.now();

    return requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        let progress = timing(timeFraction);

        draw(progress);

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
}

/**
 * Reverses the timeline of a timing function.
 * @param {function} timing a function that takes in a value 0 <= x <= 1 that returns the progress of the 
 * animation
 * @returns the reversal of the timing function
 */
function reverseTiming(timing) {
    return function(timeFraction) {
        return 1 - timing(1 - timeFraction);
    }
}

function linear(x) {
    return x;
}

function quadratic(x) {
    return x*x;
}

function cubic(x) {
    return x*x*x;
}

function quartic(x) {
    y = quadratic(x);
    return y*y;
}

function quintic(x) {
    return x * quartic(x);
}