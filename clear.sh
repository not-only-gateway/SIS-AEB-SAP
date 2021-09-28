
cd apps/admin
sudo rm -r node_modules
sudo rm -r .next

cd ../core
sudo rm -r node_modules
sudo rm -r .next


cd ../../packages/core
sudo rm -r dist
mkdir dist
sudo rm -r node_modules

exit