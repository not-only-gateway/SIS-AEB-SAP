cd ../../packages/inputs
yarn >>../../logs/build/inputs.txt 2>>../../logs/build/inputs.txt && {
  echo "HERE"
  yarn start >>../../logs/build/inputs.txt 2>>../../logs/build/inputs.txt
  yarn link >>../../logs/build/inputs.txt 2>>../../logs/build/inputs.txt
}

echo "INPUTS ARE OK"

exit
