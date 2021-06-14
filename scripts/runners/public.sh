args=$1
cd ../../apps/public

if [ "$args" == "build" ]; then
  yarn dev -- --port 443  >>../../logs/run/public.txt 2>>../../logs/build/public.txt
else
  node ssr-server.js  >>../../logs/run/public.txt 2>>../../logs/build/public.txt
fi
yarn dev
