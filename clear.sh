cd apps/admin

sudo rm -r node_modules
sudo rm -r .next

cd ../public

sudo rm -r node_modules
sudo rm -r .next

cd ../statistics

sudo rm -r node_modules
sudo rm -r .next

cd ../../packages/inputs

sudo rm -r dist
mkdir dist
sudo rm -r node_modules


cd ../header

sudo rm -r dist
mkdir dist
sudo rm -r node_modules

cd ../alert

sudo rm -r dist
mkdir dist
sudo rm -r node_modules

cd ../navigation

sudo rm -r dist
mkdir dist
sudo rm -r node_modules

exit