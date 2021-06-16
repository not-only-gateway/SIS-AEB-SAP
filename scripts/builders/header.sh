cd ../../packages/header
if [ ! -d "dist" ]; then
  mkdir dist
fi

#yarn add @babel/preset-env
#yarn add @babel/preset-react
yarn >>../../logs/build/header.txt 2>>../../logs/build/header.txt

yarn start >>../../logs/build/header.txt 2>>../../logs/build/header.txt


echo "INPUTS ARE OK"

exit
