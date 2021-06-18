cd ../../packages/navigation
if [ ! -d "dist" ]; then
  mkdir dist
fi

#yarn add @babel/preset-env
#yarn add @babel/preset-react
yarn >>../../logs/build/navigation.txt 2>>../../logs/build/navigation.txt
yarn start >>../../logs/build/navigation.txt 2>>../../logs/build/navigation.txt &&
echo "NAV OK"



exit
