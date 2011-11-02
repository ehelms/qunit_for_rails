require "active_support/core_ext/module/attribute_accessors"
require "haml"


module QunitForRails

  mattr_accessor :app_root

  def self.setup
    yield self
  end

end

require "qunit_for_rails/engine" if defined?(Rails)
