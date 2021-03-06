const formatter = require('../../dist/es6/formatter');
const assert = require('assert');

describe('logger', function () {

    let testLoggerOutput = function (loggerTag) {
        assert.equal(formatter.format(loggerTag, { logger : 'testLogger' }), 'testLogger');
    };

    it('%c', function () {

        const tag = '%c';
        testLoggerOutput(tag);

    });

    it('%logger', function () {

        const tag = '%logger';
        testLoggerOutput(tag);

    });

});