Rails.application.routes.draw do |map|
  resources :qunit_tests, :controller => 'qunit_for_rails/qunit_tests', :only => [:index]
end
