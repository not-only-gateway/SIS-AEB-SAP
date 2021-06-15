cd ../../packages/navigation
if [ ! -d "dist" ]; then
  mkdir dist
fi

{
  yarn >>../../logs/build/navigation.txt 2>>../../logs/build/navigation.txt
  yarn start >>../../logs/build/navigation.txt 2>>../../logs/build/navigation.txt
}

echo "INPUTS ARE OK"

exit
