FUNCTION_START='(function(N) {\n'
FUNCTION_END='\n}(window.nooline));'

echo -e $FUNCTION_START > nooline.cat.js

cat nooline.js 1>> nooline.cat.js 

for file in controls/*.js
	do
		echo -e '\n' >> nooline.cat.js
		cat $file 1>> nooline.cat.js
	done

echo -e $FUNCTION_END >> nooline.cat.js
