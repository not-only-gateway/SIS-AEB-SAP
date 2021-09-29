
cd packages/core
if [ ! -d "dist" ]; then
  mkdir dist
fi

yarn
yarn start

cd ../../src
yarn

exit


