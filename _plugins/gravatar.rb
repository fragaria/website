require 'digest/md5'

module Jekyll
    module Gravatar
        def to_gravatar(email_address, size = nil)
            "https://www.gravatar.com/avatar/#{hash(email_address)}"
        end

        private

        def hash(email_address)
            Digest::MD5.hexdigest(email_address.downcase.gsub(/\s+/, ""))
        end
    end
end

Liquid::Template.register_filter(Jekyll::Gravatar)
