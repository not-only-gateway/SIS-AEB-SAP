cd ../../packages/inputs

if [ ! -d "dist" ]; then
  mkdir dist
fi
#yarn add @babel/preset-env
#yarn add @babel/preset-react
yarn >>../../logs/build/inputs.txt 2>>../../logs/build/inputs.txt

yarn start >>../../logs/build/inputs.txt 2>>../../logs/build/inputs.txt

echo "INPUTS ARE OK"

exit
