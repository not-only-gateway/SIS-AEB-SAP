if [ ! -d "logs" ]; then
  mkdir logs
  cd logs
  mkdir build
  mkdir run
  cd ..
fi

cd scripts/builders

# PRIMEIRO
sudo bash inputs.sh
sudo bash navigation.sh
sudo bash alert.sh
sudo bash misc.sh

# INDEPENDENTES
sudo bash admin.sh
#sudo bash public.sh
#sudo bash statistics.sh

echo "OK"

exit


