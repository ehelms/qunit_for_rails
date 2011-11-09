QUnit.page_load = (function(){
    var page_loading = false,
        
        get_container = function() {
            return $('#qunit-page-load');
        },
        add_page = function(html) {
            var page_load_container = get_container();

            if( page_load_container.length === 0 ){
                $('body').append('<div id="qunit-page-load"></div>');
                page_load_container = get_container();
            }
            
            page_load_container.append(html);
        },
        clear_container = function(){
            var page_load_container = get_container();

            page_load_container.empty();
        },
        set_test_page = function(url, testsCallback){
            page_loading = true;
            
            parent.window.QUnit.test_loader.load(test_name, testsCallback);
        
            /*$.get(url)
            .success(function(page){
                clear_container();
                add_page(page);   
                page_loading = false;
                //testsCallback();
            })
            .error(function(){
                console.log('There was an error loading the page');
                page_loading = false;
            });*/
        };
    

    return {
        is_page_loading : function(){ return page_loading; },
        set_test_page   : set_test_page,
        clear_test_page : clear_container
    };

})();
