cd ../../apps/admin

ARGS="sis-aeb-inputs"
yarn >>../../logs/build/admin.txt 2>>../../logs/build/admin.txt

yarn link $ARGS >>../../logs/build/admin.txt 2>>../../logs/build/admin.txt

exit
