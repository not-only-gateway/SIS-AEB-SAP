cd ../../packages/chart
if [ ! -d "dist" ]; then
  mkdir dist
fi

yarn >>../../logs/build/chart.txt 2>>../../logs/build/chart.txt

yarn start >>../../logs/build/chart.txt 2>>../../logs/build/chart.txt && echo "CHART IS OK"

exit
