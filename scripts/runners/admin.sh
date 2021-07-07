args=$1

cd ../../apps/admin


yarn dev -- --port 443 >>../../logs/run/admin.txt 2>>../../logs/build/admin.txt

exit
