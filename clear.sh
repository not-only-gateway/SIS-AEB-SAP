cd apps/sap
sudo rm -r node_modules
sudo rm -r .next

cd ../../packages/core
sudo rm -r dist
mkdir dist
sudo rm -r node_modules

exit