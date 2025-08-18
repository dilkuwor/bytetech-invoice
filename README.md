sudo dokku apps:create bytetech-invoice
sudo dokku apps:list

sudo dokku buildpacks:add bytetech-invoice https://github.com/heroku/heroku-buildpack-java.git

git remote add dokku dokku@192.168.68.76:bytetech-invoice