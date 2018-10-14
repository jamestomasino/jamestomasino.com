build:
	hugo

serve:
	hugo server

deploy: build
	rsync -rvhe ssh --progress --delete ./public/ gopher.black:/var/www/www.jamestomasino.com/

.PHONY: new_post serve build deploy
