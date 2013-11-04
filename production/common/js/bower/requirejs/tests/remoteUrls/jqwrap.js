define(function (require) {
    //Tests detecting a full URL dependency inside simplified wrapper.
    null;

    function noop() {};

    return {
        isFunction: jQuery.isFunction(noop)
    };
});
