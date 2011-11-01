Rails.application.routes.draw do
  get "test/qunit/" => "qunit_for_rails/qunit_tests#index", :as => "qunit_tests"
end
