args=$1
cd ../../apps/statistics

if [ "$args" == "build" ]; then
  yarn dev -- --port 8000  >>../../logs/run/statistics.txt 2>>../../logs/build/statistics.txt
else
  node ssr-server.js  >>../../logs/run/statistics.txt 2>>../../logs/build/statistics.txt
fi
yarn dev
