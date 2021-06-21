cd apps/admin

sudo rm -r node_modules
sudo rm -r .next

cd ../public

sudo rm -r node_modules
sudo rm -r .next

cd ../statistics

sudo rm -r node_modules
sudo rm -r .next

cd ../../packages/misc

sudo rm -r dist
mkdir dist
sudo rm -r node_modules


cd ../inputs

sudo rm -r dist
mkdir dist
sudo rm -r node_modules


cd ../navigation

sudo rm -r dist
mkdir dist
sudo rm -r node_modules

exit