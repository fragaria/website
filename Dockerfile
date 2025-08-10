FROM ruby:2.7-bullseye

# System deps for native gems + Jekyll toolchain
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential git nodejs tzdata imagemagick \
    libxml2-dev libxslt1-dev pkg-config \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /srv/jekyll

# Leverage layer caching: install gems during build
COPY Gemfile* /srv/jekyll/

# Project uses old bundler; keep it to avoid resolution issues
RUN gem install bundler -v 1.17.3 \
 && bundle config set path '/usr/local/bundle' \
 && bundle install

EXPOSE 4000 35729

CMD ["bundle","exec","jekyll","serve","--livereload","--host","0.0.0.0","--port","4000","--livereload-port","35729","--watch"]
