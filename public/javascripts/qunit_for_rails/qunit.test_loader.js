var QUnit = QUnit || {};
QUnit.extensions = QUnit.extensions || {};

QUnit.extensions.test_loader = (function(){
    var test_suites = {},

        suite = function(){
            if( arguments.length === 2 ){
                if( typeof arguments[0] === 'string' && typeof arguments[1] === 'function' ){
                    load(arguments[0], arguments[1]);
                }
            } else if( arguments.length === 3 ){
                if( typeof arguments[0] === 'string' && typeof arguments[1] === 'object' &&  typeof arguments[2] === 'function' ){
                    load(arguments[0], arguments[2], arguments[1]);
                }
            }
        },
        load = function(suite_name, tests, options){
            var iframe, testFrameContainer, testFrameHeader,
                options = options || {};

            if( test_suites[suite_name] !== undefined ){
                $('#testFrameContainer_' + suite_name).remove();
            } else {
                test_suites[suite_name] = { 'name' : suite_name, 'tests' : String(tests) };
                
                $('#testFrameHeader_' + suite_name).live('click', function(){
                    $(this).siblings('iframe').toggle();
                    toggle_containers(suite_name);
                });
            }

            toggle_containers(suite_name);
            
            if( options['test_page'] ){ 
                iframe = $('<iframe />', {
                            id : 'testFrame_' + suite_name,
                            src : options['test_page']
                        });
            } else {
                iframe = $('<iframe />', {
                            id : 'testFrame_' + suite_name
                        });
            }
            
            testFrameContainer = $('<div />', { id : 'testFrameContainer_' + suite_name, class : 'testFrameContainer' });
            testFrameHeader = $('<div />', { id : 'testFrameHeader_' + suite_name, class : 'testFrameHeader' });
            
            testFrameHeader.append($('<h2/>', { text : "Running....." }));
            testFrameHeader.append($('<h2/>', { text : "Tests for test suite: " + suite_name }));

            testFrameContainer.append(testFrameHeader);
            testFrameContainer.append(iframe);

            iframe.load(function(){
                get_scripts(suite_name);
            });

            $('#testSuiteContainer').append(testFrameContainer);
            iframe.width('100%');

        },
        get_scripts = function(suite_name){
            var scripts = [];
            
            scripts.push($('<link />', { href : '/katello/stylesheets/qunit.css', rel : 'stylesheet', type : 'text/css' }));
            scripts.push($('<script />', { src : '/katello/javascripts/qunit_for_rails/jquery-1.6.4.min.js', type : 'text/javascript' }));
            scripts.push($('<script />', { src : '/katello/javascripts/qunit_for_rails/qunit.js', type : 'text/javascript' }));
            scripts.push($('<script />', { src : '/katello/javascripts/qunit_for_rails/jquery.mockjax.js', type : 'text/javascript' }));
            scripts.push($('<script />', { src : '/katello/javascripts/qunit_for_rails/qunit.test_page.js', type : 'text/javascript' }));

            for( script in scripts){
                $('#testFrame_' + suite_name)[0].contentDocument.getElementsByTagName('head')[0].appendChild(scripts[script][0]);
            }

            
            //$('#testFrame_' + suite_name)[0].contentDocument.getElementsByTagName('body')[0].setAttribute('data-url', QFR.root_url + '/javascripts/test/' + test_script);
            $('#testFrame_' + suite_name)[0].contentDocument.getElementsByTagName('body')[0].setAttribute('data-testname', suite_name);
        },
        toggle_containers = function(current_suite){
            var suite;

            for( suite in test_suites ){
                if( suite !== current_suite ){
                    $('#testFrame_' + suite).hide();
                }
            }
        },
        get_suite = function(suite_name){
            return test_suites[suite_name]['tests'];
        };

    return {
        load        : load,
        suite       : suite,
        get_suite   : get_suite
    };

})();
