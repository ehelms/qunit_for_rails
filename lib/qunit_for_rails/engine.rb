require "rails/engine"
require "qunit_for_rails"

module QunitForRails

  class Engine < Rails::Engine

    initializer "static assets" do |app|
      app.middleware.use ::ActionDispatch::Static, "#{root}/public"
    end
    
  end

end
