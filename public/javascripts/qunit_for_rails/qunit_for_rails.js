var QFR = QFR || {};
test_list = [];

var QUnit_For_Rails = {
    
    init: function init()
    {
        // define qunit menu
        var qm = '';
        qm += "<div id=\"qunit-menu\">";
        qm += "<ul class=\"qunit-menu\">";
        qm += "<li><b>Shortcuts (shift + ):</b></li>";
        qm += "<li><b>?</b> - shows/hides the menu</li>";
        qm += "<li><b>s</b> - shows qunit overlay</li>";
        qm += "<li><b>h</b> - hides qunit overlay</li>";
        qm += "<li><b>a</b> - runs all tests</li>";
        qm += "<li><b>t</b> - shows/hides tests</li>";
        qm += "</ul>";
        qm += "</div>";

        // define qunit results
        var qr = "";
        //qr += "<h1 id=\"qunit-header\">Results</h1>";
        qr += "<h2 id=\"qunit-userAgent\"></h2>";
        qr += '<img id="qunit-loading" src="' + QFR.root_url + '/images/i_loading_bar.gif" alt="loading">';

        // tests list select
        var tl = "";
        tl += "<select id='qunit-test-select'><option></option><option>all</option>";
        for(var i = 0; i < test_list.length; i += 1){
            tl += '<option id="' + test_list[i]  +'">' + test_list[i] + '</option>'; 
        }
        tl += "</select>";

        // define qunit-overlay
        var qo = '<div id="qunit-container">';
        qo += "<div id=\"qunit-overlay\">";
        qo += "<div id=\"qunit-test-options\">";
        qo += "<ul class=\"qunit\">";
        qo += "<li class=\"first\"><a id=\"qunit-all-tests\" href=\"#\">Run All Tests</a></li>";
        qo += "<li class=\"last\">Or Choose A Test: " + tl;
        qo += "</ul>";
        qo += '<img src="' + QFR.root_url + '/images/bg_secondaryNav_right.gif">';
        qo += "</div>";
        qo += qm;
        qo += "<div id=\"qunit-logo\">";
        qo += "JavaScript testing powered by: <a href=\"http://docs.jquery.com/QUnit\">";
        qo += '<img src="' + QFR.root_url + '/images/l_qunit.png" alt=\"qunit\" border=\"0\"></a></div>';
        qo += "</div>";
        qo += qr;
        qo += "<div style='clear:both;'></div>";
        qo += '</div>'
        qo += '<div id="testSuiteContainer"></div>';
        
        $("body").prepend(qo);

        $('#qunit-menu').css('background', 'url(' + QFR.root_url + '/images/bg_diagonalDarkBlue.gif) rgb(51, 51, 51)');
        $('ul.qunit').css('background', 'url(' + QFR.root_url + '/images/bg_secondaryNav_left.gif) no-repeat');
    },
    
    respond_to_key: function respond_to_key(e) 
    {
        if (document.activeElement['nodeName'] == "INPUT" || document.activeElement['nodeName'] == "TEXTAREA") {
            // escape if in a textfield
        } else {
            if (e.shiftKey) {
                var unicode = e.keyCode? e.keyCode : e.charCode;
                switch (unicode) {
                    case 83: case 115: 			// s keypress
                    $('#qunit-overlay').show();
                    break;
                  case 72: case 104: 			// h keypress
                    if($("#qunit-results").height() > 0)
                            $("#qunit-results").animate({ height: "0px"}, 500 );
                        $('#qunit-overlay').hide();
                    break;
                    case 191: case 47: 			// ? keypress
                    $('#qunit-overlay').show();
                        $('#qunit-menu').toggle();
                    break;
                    case 65: case 97: 			// a keypress
                        $("#qunit-all-tests").click();
                    break;
                    case 84: case 116: 			// t keypress
                        if($("#qunit-results").height() > 0) {
                            $("#qunit-results").animate({ height: "0px"}, 500 );
                        } else {
                            $('#qunit-overlay').show();
                            $("#qunit-results").animate({ height: "400px"}, 500 );
                        }
                        break;
                  default:
                    break;
              }
            }
        }
    },

    load_js_file: function load_js_file(filename)
    {
        QUnit.extensions.test_loader.load(filename);
    },

    unload_js_file: function unload_js_file(filename)
    {
        var targetelement="script";
        var targetattr="src";
        var allsuspects=document.getElementsByTagName(targetelement);
        for (var i=allsuspects.length; i>=0; i--) {
        if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
            allsuspects[i].parentNode.removeChild(allsuspects[i]);
        }
    },

    show_tests: function show_tests()
    {
        $('#qunit-overlay').show();
        // clear out any previous results
        $("#qunit-tests li").remove();
        $("#qunit-testresult").remove();
        $("#qunit-banner").attr("class", "");
        $("#qunit-results").show();
        $("#qunit-results").animate({ height: "400px"}, 500 );
        $("#qunit-loading").show();
    }
};

$(document).ready(function() 
{
    QUnit.load();
    
    QUnit_For_Rails.init();

    $("#qunit-results").hide();
    $("#qunit-loading").hide();
    $("#qunit-results").animate({ height: "0px"}, 1 );

    if ($.browser.mozilla) {
        $(document).keypress (QUnit_For_Rails.respond_to_key);
    } else {
        $(document).keydown (QUnit_For_Rails.respond_to_key);
    }

    $("#qunit-test-select").change( function() {
        if ($(this).val() !== "all" && $(this).val() !== "") {
            QUnit_For_Rails.load_js_file($(this).val());
        } else if( $(this).val() === "all" ) {
            for(var j in test_list) {
                QUnit_For_Rails.load_js_file(test_list[j]);
            }
        }
    });

    $("#qunit-all-tests").click( function() {
        $("#qunit-test-select option:contains(all)").attr("selected", true);
        $("#qunit-test-select").change();
    });

});
