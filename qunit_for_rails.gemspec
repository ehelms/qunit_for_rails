# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require "qunit_for_rails/version"

Gem::Specification.new do |s|
  s.name        = "qunit_for_rails"
  s.version     = QunitForRails::VERSION
  s.authors     = ["Michael Krisher", "Eric D Helms"]
  s.email       = ["ericdhelms@gmail.com"]
  s.homepage    = "https://github.com/ehelms/qunit_for_rails"
  s.summary     = ""
  s.description = "Helper to integrate QUnit JavaScript testing into any Rails app"


  s.rubyforge_project = "qunit_for_rails"

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]

  # specify any dependencies here; for example:
  # s.add_development_dependency "rspec"
  # s.add_runtime_dependency "rest-client"
end
