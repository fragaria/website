.PHONY: run
run:
	bundle exec jekyll serve --livereload


.PHONY: run-withdrafts
run-withdrafts:
	bundle exec jekyll serve --livereload --future --drafts
