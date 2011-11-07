QUnit.test_page = (function(){

    var init = function(){
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

        $.getScript($('body').data('url'), function(){ QUnit.load(); });
    };

    return {
        init : init
    }

})();

$(document).ready(function(){
    QUnit.test_page.init();
});
