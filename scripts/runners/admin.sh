args=$1

cd ../../apps/admin

if [ "$args" == "dev" ]; then
  yarn dev -- --port 80 >>../../logs/run/admin.txt 2>>../../logs/build/admin.txt
else
  node ssr-server.js >>../../logs/run/admin.txt 2>>../../logs/build/admin.txt
fi
yarn dev
