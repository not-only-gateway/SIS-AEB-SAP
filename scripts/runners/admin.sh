args=$1

cd ../../apps/admin

if [ "$args" != "build" ]; then
  yarn dev -- --port 80 >>../../logs/run/admin.txt 2>>../../logs/build/admin.txt
else
  echo 'cafe'
#  node ssr-server.js >>../../logs/run/admin.txt 2>>../../logs/build/admin.txt
fi
yarn dev
