module Providers
  module Mock
    class MockProviderApplication < ProviderApplication
      @@provider_applications = []
      @@id = 1

      def initialize(attributes = {})
        attributes.each do |name, value|
          send("#{name}=", value)
        end
      end

      def launchable
        Providers::Mock::MockLaunchable.find(@launchable_id)
      end

      def save
        @id = @@id
        @@id = @@id + 1
        @state = 'running'
        @@provider_applications << self
      end

      def destroy
        @@provider_applications.delete(self)
      end

      # List all of the Provider Applications.
      def self.all filter=nil
        filter ||= {}
        @@provider_applications
      end

      def self.find(id)
        @@provider_applications.find{ |app| app.id.to_s == id }
      end
    end
  end
end