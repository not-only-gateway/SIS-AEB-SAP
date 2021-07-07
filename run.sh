args=$1

cd scripts/runners

#sudo bash admin.sh "$args"
sudo bash forum.sh "$args"
#sudo bash public.sh "$args"  &
#sudo bash statistics.sh "$args"  &

echo "OK"

exit


