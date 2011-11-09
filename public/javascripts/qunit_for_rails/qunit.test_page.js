var QUnit = QUnit || {};

QUnit.test_page = function($){

    var init = function(){
        var test_suite;

        // define qunit results
        var qr = "";
        qr += "<h1 id=\"qunit-header\">Results</h1>";
        qr += "<h2 id=\"qunit-banner\"></h2>";
        qr += '<div id="qunit-testrunner-toolbar"></div>';
        qr += "<h2 id=\"qunit-userAgent\"></h2>";
        qr += '<p id="qunit-testresult" class="result"></p>';
        qr += "<ol id=\"qunit-tests\"></ol>";
        qr += '<div id="qunit-fixture">test markup, will be hidden</div>';
        qr += "</div>";

        $("body").prepend(qr);
        
        QUnit.done = function(results){
            if( results['failed'] !== 0 ){
                parent.window.$('#testFrameHeader_' + $('body').data('testname')).find('h2:first').html('Failed!');
                parent.window.$('#testFrameHeader_' + $('body').data('testname')).addClass('fail');
            } else {
                parent.window.$('#testFrameHeader_' + $('body').data('testname')).find('h2:first').html('Passed!');
                parent.window.$('#testFrameHeader_' + $('body').data('testname')).addClass('pass');
            }
        } 

        test_suite = parent.window.QUnit.extensions.test_loader.get_suite($('body').data('testname'));
        load_tests(test_suite);

    },
    load_tests = function(tests){
        if( typeof tests === 'string' ){
            QUnit.load();
            var func = eval('[' + tests + ']')[0];
            func();
        }
    };

    return {
        init        : init,
        load_tests  : load_tests
    }

};

$(document).ready(function(){
    var custom = $.noConflict(true);

    QUnit.test_page(custom).init();
});
