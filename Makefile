#=================================================================================
# Deployment
#=================================================================================

deploy:
	s3_website push --site=public/ --config-dir "$$HOME/.s3config/jamestomasino.com/"

#  vim: set shiftwidth=4 tabstop=4 noexpandtab:
