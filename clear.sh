cd apps/admin
sudo rm -r node_modules
sudo rm -r .next

cd ../forums
sudo rm -r node_modules
sudo rm -r .next

cd ../sap
sudo rm -r node_modules
sudo rm -r .next

cd ../inputs
sudo rm -r dist
mkdir dist
sudo rm -r node_modules


cd ../chart
sudo rm -r dist
mkdir dist
sudo rm -r node_modules

cd ../navigation
sudo rm -r dist
mkdir dist
sudo rm -r node_modules

exit