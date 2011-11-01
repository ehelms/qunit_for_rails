module QunitForRails
  class QunitTestsController < ApplicationController
    
    unloadable

    def index
      render :index
    end

  end
end
