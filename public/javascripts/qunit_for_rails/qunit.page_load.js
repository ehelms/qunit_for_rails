QUnit.page_load = (function($){
    var get_container = function() {
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
        set_test_page = function(url){
            $.get(url)
            .success(function(page){
                clear_container();
                add_page(page);   
            })
            .error(function(){
                console.log('There was an error loading the page');
            });
        };
    

    return {
        set_test_page   : set_test_page,
        clear_test_page : clear_container
    };

})(jQuery);
