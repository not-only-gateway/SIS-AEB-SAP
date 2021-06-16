# STATISTICS
sudo fuser -k 8000/tcp
# ADMIN
sudo fuser -k 80/tcp
# PUBLIC
sudo fuser -k 443/tcp

sudo fuser -k 3000/tcp

echo 'OK'

exit