cd ../../packages/misc
if [ ! -d "dist" ]; then
  mkdir dist
fi

#yarn add @babel/preset-env
#yarn add @babel/preset-react
yarn >>../../logs/build/misc.txt 2>>../../logs/build/misc.txt

yarn start >>../../logs/build/misc.txt 2>>../../logs/build/misc.txt


echo "INPUTS ARE OK"

exit
