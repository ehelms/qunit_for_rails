module QunitForRails
  class QunitTestsController < ApplicationController
    
    unloadable

    def index
      render :nothing => true
    end

  end
end
