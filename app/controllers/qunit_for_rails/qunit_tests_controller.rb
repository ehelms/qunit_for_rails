module QunitForRails
  class QunitTestsController < ApplicationController
    skip_before_filter :authorize
    layout "qunit_for_rails/main"
    
    def index
      test_files = []
      
      Dir.glob(::Rails.root.to_s + "/public/javascripts/test/*").each { |file| 
        if file.end_with?('_test.js')
          test_files << file.split('/').last
        end
      }
      
      render :index, :locals => { :test_files => test_files, :root_url => ENV['RAILS_RELATIVE_URL_ROOT'] }
    end

  end
end
