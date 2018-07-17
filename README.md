# Fragaria website

## Table of contents

- [Fragaria website](#fragaria-website)
    - [Table of contents](#table-of-contents)
- [Development](#development)
    - [Installation](#installation)
        - [Install build dependencies](#install-build-dependencies)
            - [Ubuntu 18.04](#ubuntu-1804)
            - [Fedora 28](#fedora-28)
        - [Install rbenv](#install-rbenv)
        - [Installing dependencies on macOS](#installing-dependencies-on-macos)
        - [Installing the app](#installing-the-app)
    - [Launching the app](#launching-the-app)
    - [Using Docker](#using-docker)

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

Then, install Ruby gems using following from *within the
repository directory*:

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

Testing site will be available at `http://localhost:4000/website/`.

## Using Docker

This theme has built-in Docker support. For many users, it's the easiest option
to get things up and running.

First, make sure you have Docker along with `docker-comopose` installed. To do
so, please follow a guide according to you OS of choice:

* [Windows](https://docs.docker.com/docker-for-windows/install/)
* [macOS](https://docs.docker.com/docker-for-mac/install/)
* [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
* [Fedora](https://docs.docker.com/install/linux/docker-ce/fedora/)

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
