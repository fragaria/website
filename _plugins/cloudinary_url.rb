# A simple plugin for Jekyll that allows you to use {% url "alt text" %} to add images to your posts.
# It will automatically check those images for width and height.

require "liquid/tag/parser"
require 'pp'

module Jekyll
    class CloudinaryUrlTag < Liquid::Tag
        def initialize(tag, args, tokens)
            @args = Liquid::Tag::Parser.new(args)
            @raw_args = args
            @tag = tag.to_sym
            @tokens = tokens
            super
        end

        def render(context)
            settings_defaults = {
                "cloud_name"     => "",
                "only_prod"      => false,
                "verbose"        => false,
            }

            transformation_options = {
                "width"          => "w",
                "height"         => "h",
                "crop"           => "c", # can include add-on: imagga_scale
                "format"         => "f",
                "aspect_ratio"   => "ar",
                "gravity"        => "g",
                "zoom"           => "z",
                "x"              => "x",
                "y"              => "y",
                "fetch_format"   => "f",
                "quality"        => "q", # can include add-on: jpegmini
                "radius"         => "r",
                "angle"          => "a",
                "effect"         => "e", # can include add-on: viesus_correct
                "opacity"        => "o",
                "border"         => "bo",
                "background"     => "b",
                "overlay"        => "l",
                "underlay"       => "u",
                "default_image"  => "d",
                "delay"          => "dl",
                "color"          => "co",
                "color_space"    => "cs",
                "dpr"            => "dpr",
                "page"           => "pg",
                "density"        => "dn",
                "flags"          => "fl",
                "transformation" => "t",
            }

            # Settings
            site = context.registers[:site]
            site_url = site.config["url"] || ""
            site_baseurl = site.config["baseurl"] || ""

            if site.config["cloudinary"].nil?
                Jekyll.logger.abort_with("[Cloudinary]", "You must set your cloud_name in _config.yml")
            end

            settings = settings_defaults.merge(site.config["cloudinary"])

            if settings["cloud_name"] == ""
                Jekyll.logger.abort_with("[Cloudinary]", "You must set your cloud_name in _config.yml")
            end

            if not @args[:argv1]
                Jekyll.logger.abort_with("[Cloudinary]", "You need to provide image path for the {% cloudinary_url %} tag, got {% cloudinary_url #{@raw_args} %}")
            end

            # Get image path
            image_path = ""

            # image argument is context variable
            if context[@args[:argv1]]
                image_path = context[@args[:argv1]]
            # Consider image as string instead
            else
                image_path = @args[:argv1]
            end

            if settings["cloud_path_prefix"]
                image_path = settings["cloud_path_prefix"] + image_path
            end

            # Figure out the Cloudinary transformations
            transformations = []
            transformations_string = ""
            transformation_options.each do |key, shortcode|
                if @args[key.to_sym]
                    val = ""

                    begin
                        if context[@args[key.to_sym]]
                            val = context[@args[key.to_sym]]
                        else
                            val = @args[key.to_sym]
                        end
                    rescue
                        val = @args[key.to_sym]
                    end

                    transformations << "#{shortcode}_#{val}"
                end
            end

            unless transformations.empty?
                transformations_string = transformations.compact.reject(&:empty?).join(",")
            end

            return "https://res.cloudinary.com/#{settings["cloud_name"]}/image/upload/#{transformations_string}/#{image_path}"
        end
    end
end

Liquid::Template.register_tag('cloudinary_url', Jekyll::CloudinaryUrlTag)
