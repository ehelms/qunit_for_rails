QUnit.extensions = QUnit.extensions || {};

QUnit.extensions.test_loader = (function(){
    var load = function(filename){
            var iframe = $('<iframe />', {
                            id : 'testFrame'
                        }),
                testFrameContainer = $('<div />', { class : 'testFrameContainer' }),
                testFrameHeader = $('<div />', { class : 'testFrameHeader', style : 'height:50px' });

            testFrameContainer.append(testFrameHeader);
            testFrameContainer.append(iframe);

            $('.testFrameHeader').live('click', function(){
                iframe.toggle();
            });

            $('body').append(testFrameContainer);
            $('#testFrame').width('100%');
            $('#testFrame').height('500px');


            get_scripts(filename);
        },
        get_scripts = function(test_script){
            var scripts = [];
            
            scripts.push($('<link />', { href : '/katello/stylesheets/qunit.css', rel : 'stylesheet', type : 'text/css' }));
            scripts.push($('<script />', { src : '/katello/javascripts/qunit_for_rails/jquery-1.6.4.min.js', type : 'text/javascript' }));
            scripts.push($('<script />', { src : '/katello/javascripts/qunit_for_rails/qunit.js', type : 'text/javascript' }));
            scripts.push($('<script />', { src : '/katello/javascripts/qunit_for_rails/qunit.test_page.js', type : 'text/javascript' }));
            //scripts.push($('<script />', { src : '/katello/javascripts/qunit_for_rails/qunit.page_load.js', type : 'text/javascript' }));
 
            //scripts.push($('<script />', { src : QFR.root_url + '/javascripts/test/' + test_script, type : 'text/javascript' }));

            for( script in scripts){
                $('#testFrame')[0].contentDocument.getElementsByTagName('head')[0].appendChild(scripts[script][0]);
            }

            
            $('#testFrame')[0].contentDocument.getElementsByTagName('body')[0].setAttribute('data-url', QFR.root_url + '/javascripts/test/' + test_script);
        };

    return {
        load    : load
    };

})();
