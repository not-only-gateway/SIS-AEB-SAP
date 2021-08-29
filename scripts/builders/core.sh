cd ../../packages/core
if [ ! -d "dist" ]; then
  mkdir dist
fi

#yarn add @babel/preset-env
#yarn add @babel/preset-react
yarn >>../../logs/build/core.log 2>>../../logs/build/core.err

yarn start >>../../logs/build/core.log 2>>../../logs/build/core.err && echo 'Packages OK'


exit
