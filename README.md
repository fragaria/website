# Fragaria.cz website

[![Build Status](https://travis-ci.org/fragaria/website.svg?branch=master)](https://travis-ci.org/fragaria/website)

## Table of contents

- [Fragaria.cz website](#fragariacz-website)
  - [Table of contents](#table-of-contents)
- [Creating posts](#creating-posts)
  - [Providing images for the posts](#providing-images-for-the-posts)
  - [Including images within the post body](#including-images-within-the-post-body)
  - [Including Youtube videos in the post body](#including-youtube-videos-in-the-post-body)
  - [Including embeddables like iframes](#including-embeddables-like-iframes)
  - [Highlighting code blocks](#highlighting-code-blocks)
- [Development](#development)
  - [Installation](#installation)
    - [Install build dependencies](#install-build-dependencies)
      - [Ubuntu 18.04](#ubuntu-1804)
      - [Fedora 28](#fedora-28)
    - [Install rbenv](#install-rbenv)
    - [Installing dependencies on macOS](#installing-dependencies-on-macos)
    - [Installing the app](#installing-the-app)
  - [Launching the app](#launching-the-app)
  - [Viewing future articles and drafts](#viewing-future-articles-and-drafts)
  - [Using Docker](#using-docker)
- [Deployment](#deployment)

# Creating posts

The recommended way to add a new post is a pull request. Simply fork the
repository, create your new post and make a PR. You can verify your post
looks OK on your local installation.

Posts are kept in `_posts` folder. They are simple Markdown documents with
a header that contains [jekyll front matter](https://jekyllrb.com/docs/frontmatter/)
written in YAML. Take a look at other files in `_posts` for the reference
what can be included.

Post files should be written in Markdown otherwise and the files **have to be named**
in following format:

    [year]-[month]-[day]-[slugified post title].md

E.g.: `2014-10-20-ako-vyrobit-staticky-web-efektivne.md`

At minimum, following properties need to be declared in the front matter:

-   `title`: title of your post
-   `date`: publication date of the post in ISO format (e.g. 2014-10-20T13:37:00.002+02:00)
-   `author`: your name
-   `lang`: language of the post (cs, sk, en)... we generally recommend writing all posts in English
-   `tags`: keywords of the post as a YAML array

## Providing images for the posts

Images should be provided in high resolution so that we can serve it in good
quality for retina displays too. Always make sure your image is at least in
Full-HD resolution. More is even better.

All post images are hosted on Cloudinary. There is a image upload script in
the `__tools` directory that you can use to upload your image.

Simply navigate to the directory, run `npm install` and then run the command:

    ./images upload [path to your image]

The result will be something like:

    Upload successful.
    Public ID:  posts/osi_rllzfu

Note the `Public ID` string. You can use this string as `cloudinary_src`
attribute in the post **front matter**. This will serve as the post's main
image.

## Including images within the post body

To include image within the post body, start by uploading the image using
the `__tools/images` script described above. Once you have your `Public ID`,
you can embed your image by typing:

    {% include figure.html cloudinary_src='[Public ID]' caption='[optional caption]' %}

You can omit the the `caption` argument.

## Including Youtube videos in the post body

Just type:

    {% include youtube.html id='[youtube video id]' %}

## Including embeddables like iframes

You can embed iframes normally like you would do in a HTML document. Jekyll
understands HTML syntax within markdown documents too.

## Highlighting code blocks

Use `{% highlight %}` tag for that:

    {% highlight html %}
    <my-code></my-code>
    {% endhighlight %}

You can also enable line numbers with: `{% highlight html linenos %}`.

# Development

This project requires Ruby to be installed on your computer (best installed
using [rbenv](https://github.com/rbenv/rbenv)).

## Installation

The process is practically the same on any Linux. Only difference is build dependencies.

### Install build dependencies

First, install required development dependencies:

#### Ubuntu 18.04

```
sudo apt-get update
sudo apt-get install git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev software-properties-common
```

#### Fedora 28

```
sudo dnf install git-core zlib zlib-devel gcc-c++ patch readline readline-devel libyaml-devel libffi-devel openssl-devel make bzip2 autoconf automake libtool bison curl
```

### Install rbenv

Next, install Ruby using rbenv:

```
cd
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
exec $SHELL

git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.bashrc
exec $SHELL

rbenv install 2.5.1
rbenv global 2.5.1
ruby -v # Verify ruby@2.5.1 is installed
```

### Installing dependencies on macOS

```
brew install rbenv
rbenv init
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
exec $SHELL
rbenv install 2.5.1
ruby -v # Verify ruby@2.5.1 is installed
```

### Installing the app

Once you have Ruby installed, clone the `fragaria/website` repository:

```
git clone https://github.com/fragaria/website.git fragaria.cz
```

Switch to the cloned repository:

```
cd fragaria.cz
```

Then, install Ruby gems using following from _within the
repository directory_:

```
rbenv install         # Installs Ruby version required by the project
gem install bundler   # Installs bundler
bundle install        # Installs Ruby gems
```

## Launching the app

Start the application using:

```
bundle exec jekyll serve --livereload
```

Testing site will be available at `http://localhost:4000/`.

## Viewing future articles and drafts

Simple! Just run the app using:

```
bundle exec jekyll serve --livereload --future --drafts
```

## Using Docker

This theme has built-in Docker support. For many users, it's the easiest option
to get things up and running.

First, make sure you have Docker along with `docker-comopose` installed. To do
so, please follow a guide according to you OS of choice:

-   [Windows](https://docs.docker.com/docker-for-windows/install/)
-   [macOS](https://docs.docker.com/docker-for-mac/install/)
-   [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
-   [Fedora](https://docs.docker.com/install/linux/docker-ce/fedora/)

`docker-compose` can be installed by following
[official resources](https://docs.docker.com/compose/install/).

**Note for Fedora**: It's better to run docker-compose without `sudo`. Please
follow [this guide](https://bluntinstrumentsoftesting.com/2016/12/03/run-docker-without-sudo-in-fedora-25/)
to allow running without it.

Once you have Docker deamon running, just navigate to a cloned repository and
run:

```
docker-compose up
```

First boot might take some time, but you should be presented with a running
app after a while.

# Deployment

Use provided `build.sh` script. It will build the site using Docker and automatically commit to the `gh-pages` branch.
You simply confirm your will by pushing:

```sh
./build.sh
git push
```

Note: make sure you've committed all your work before running this as it will fail when switching to `gh-pages` branch
otherwise.
