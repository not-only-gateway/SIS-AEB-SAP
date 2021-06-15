cd ../../packages/inputs

#yarn link >>../../logs/build/inputs.txt 2>>../../logs/build/inputs.txt &&
{
  yarn >>../../logs/build/inputs.txt 2>>../../logs/build/inputs.txt
  yarn start >>../../logs/build/inputs.txt 2>>../../logs/build/inputs.txt
}

echo "INPUTS ARE OK"

exit

#"start": "microbundle-crl --no-compress --format modern,cjs",