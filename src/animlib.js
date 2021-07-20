class CustomAnimation {
    /**
     * @constructor Constructs a CustomAnimation object that stores the duration, timing, and effect of the
     * animation.
     * @param {function} timing - A function that takes in a value 0 <= x <= 1 that returns the progress of the
     * animation
     * @param {function} draw - A function that takes in a value representing the progress of the animation and 
     * translates it into action on the webpage
     * @param {number} duration - The duration of the animation in milliseconds
     */
    constructor(timing, draw, duration) {
        this.timing = timing;
        this.draw = draw;
        this.duration = duration;
    }
}

class AnimationIdHolder {
    /**
     * @constructor Constructs an object that holds the animation id for cancellation.
     * @param {number} id - The animation id for cancelling the rest of the animation.
     */
    constructor(id) {
        this.id = id;
    }
}

/**
 * Runs a CustomAnimation through the requestAnimationFrame callback.
 * @param {CustomAnimation} param0 - The CustomAnimation object
 * @param {AnimationIdHolder} idHolder - The object to store the id of the animation.
 * @author Ilya Kantor => https://javascript.info/js-animation
 */
function animate({timing, draw, duration}, idHolder) {

    let start = performance.now();

    idHolder.id = requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        let progress = timing(timeFraction);

        draw(progress);

        if (timeFraction < 1) {
            idHolder.id = requestAnimationFrame(animate);
        }
        else {
            idHolder.id = 0;
        }
    });
}

/**
 * Runs a list of CustomAnimations through the requestAnimationFrame callback in order.
 * @param {CustomAnimation[]} anims - A list of CustomAnimations.
 * @param {AnimationIdHolder} idHolder - The object to store the id of the animation.
 */
function animateMany(anims, idHolder) {

    let start = performance.now();
    let curr = 0;

    idHolder.id = requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / anims[curr].duration;
        if (timeFraction > 1) timeFraction = 1;

        let progress = anims[curr].timing(timeFraction);

        anims[curr].draw(progress);

        if (timeFraction < 1) {
            idHolder.id = requestAnimationFrame(animate);
        }
        else if (++curr < anims.length) {
            start = performance.now();
            idHolder.id = requestAnimationFrame(animate);
        }
        else {
            idHolder.id = 0;
        }
    });
}

/**
 * Reverses the timeline of a timing function.
 * @param {function} timing - A function that takes in a value 0 <= x <= 1 that returns the progress of the 
 * animation
 * @returns The reversal of the timing function
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