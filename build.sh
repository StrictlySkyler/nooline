FUNCTION_START='(function(N) {\n'
FUNCTION_END='\n}(window.nooline));'
CATFILE=./client/common/js/nooline.cat.js
NOOLINE_INIT_JS=./client/common/js/nooline.js
CONTROLS=./client/common/js/controls/*.js

echo -e $FUNCTION_START > $CATFILE

cat $NOOLINE_INIT_JS 1>> $CATFILE 

for file in $CONTROLS
	do
		echo -e '\n' >> $CATFILE
		cat $file 1>> $CATFILE
	done

echo -e $FUNCTION_END >> $CATFILE
