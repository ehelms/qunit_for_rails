require "rails/engine"
require "qunit_for_rails"

module QunitForRails

  class Engine < Rails::Engine

    initializer "load_app_instance_data" do |app|
      QunitForRails.setup do |config|
        config.app_root = app.root
      end
    end

    initializer "static assets" do |app|
      app.middleware.use ::ActionDispatch::Static, "#{root}/public"
    end
    
    initializer "interact_with_routes", :after => :disable_dependency_loaading do |app|
      debugger
    end

  end

end
