cd apps/sap
sudo rm -r node_modules
sudo rm -r .next

cd ../../packages/inputs
sudo rm -r dist
mkdir dist
sudo rm -r node_modules


cd ../../packages/navigation
sudo rm -r dist
mkdir dist
sudo rm -r node_modules

exit