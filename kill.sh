# STATISTICS
sudo fuser -k 8000/tcp &
# ADMIN
sudo fuser -k 80/tcp &
# PUBLIC
sudo fuser -k 443/tcp

echo 'OK'

exit