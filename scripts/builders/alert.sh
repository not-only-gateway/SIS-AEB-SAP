cd ../../packages/alert
if [ ! -d "dist" ]; then
  mkdir dist
fi

{
  yarn >>../../logs/build/alert.txt 2>>../../logs/build/alert.txt
  yarn start >>../../logs/build/alert.txt 2>>../../logs/build/alert.txt
}

echo "INPUTS ARE OK"

exit
