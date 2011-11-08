QUnit.extensions = QUnit.extensions || {};

QUnit.extensions.test_loader = (function(){
    var test_suites = {},

        load = function(filename){
            var test_name = filename.split('.js')[0],
                iframe, testFrameContainer, testFrameHeader;

            if( test_suites[test_name] !== undefined ){
                $('#testFrameContainer_' + test_name).remove();
            } else {
                test_suites[test_name] = filename;
                
                $('#testFrameHeader_' + test_name).live('click', function(){
                    iframe.toggle();
                    toggle_containers(test_name);
                });
            }

            toggle_containers(test_name);

            iframe = $('<iframe />', {
                        id : 'testFrame_' + test_name
                    }),
            testFrameContainer = $('<div />', { id : 'testFrameContainer_' + test_name, class : 'testFrameContainer' }),
            testFrameHeader = $('<div />', { id : 'testFrameHeader_' + test_name, class : 'testFrameHeader' });
            
            testFrameHeader.append($('<h2/>', { text : "Tests for: " + filename }));

            testFrameContainer.append(testFrameHeader);
            testFrameContainer.append(iframe);

            $('#testSuiteContainer').append(testFrameContainer);
            iframe.width('100%');
            iframe.height('500px');

            get_scripts(test_name, filename);
        },
        get_scripts = function(test_name, test_script){
            var scripts = [];
            
            scripts.push($('<link />', { href : '/katello/stylesheets/qunit.css', rel : 'stylesheet', type : 'text/css' }));
            scripts.push($('<script />', { src : '/katello/javascripts/qunit_for_rails/jquery-1.6.4.min.js', type : 'text/javascript' }));
            scripts.push($('<script />', { src : '/katello/javascripts/qunit_for_rails/qunit.js', type : 'text/javascript' }));
            scripts.push($('<script />', { src : '/katello/javascripts/qunit_for_rails/qunit.test_page.js', type : 'text/javascript' }));

            for( script in scripts){
                $('#testFrame_' + test_name)[0].contentDocument.getElementsByTagName('head')[0].appendChild(scripts[script][0]);
            }

            
            $('#testFrame_' + test_name)[0].contentDocument.getElementsByTagName('body')[0].setAttribute('data-url', QFR.root_url + '/javascripts/test/' + test_script);
            $('#testFrame_' + test_name)[0].contentDocument.getElementsByTagName('body')[0].setAttribute('data-id', test_name);
        },
        toggle_containers = function(current_suite){
            var suite;

            for( suite in test_suites ){
                if( suite !== current_suite ){
                    $('#testFrame_' + suite).hide();
                }
            }
        };

    return {
        load    : load
    };

})();
