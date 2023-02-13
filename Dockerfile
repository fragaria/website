FROM jekyll/jekyll:3.7.3

# Install ImageMagick
RUN apk --no-cache add \
    file \
    imagemagick

WORKDIR /srv/jekyll

VOLUME  /srv/jekyll

COPY . /srv/jekyll

RUN bundle install

EXPOSE 35729
EXPOSE 4000
