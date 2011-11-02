module QunitForRails
  class QunitTestsController < ApplicationController
    layout "qunit_for_rails/main"
    
    def index
      test_files = []
      
      Dir.glob(RAILS_ROOT + "/public/javascripts/test/*").each { |file| 
        if file.end_with?('_test.js')
          test_files << file.split('/').last
        end
      }
      
      render :index, :locals => { :test_files => test_files }
    end

  end
end
