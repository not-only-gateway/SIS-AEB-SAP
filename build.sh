if [ ! -d "logs" ]; then
  mkdir logs
  cd logs
  mkdir build
  mkdir run
  cd ..
fi

cd scripts/builders

# PRIMEIRO
sudo bash core.sh

# INDEPENDENTES
sudo bash admin.sh
sudo bash sap.sh
#sudo bash public.sh
#sudo bash statistics.sh

echo "OK"

exit


