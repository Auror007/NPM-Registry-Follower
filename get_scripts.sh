#!/bin/bash

#curl -o npm.json https://replicate.npmjs.com/_all_docs
echo "Number of files fetched :"
cat npm.json | wc -l

#fetch all the names of packages and remove " from  the name and save it in id.json
#jq '.rows[] .id' npm.json | sed 's/"//g' > id.json

mkdir $PWD/scripts

file=$PWD/id.json
echo $file

while read -r names;
do
#	echo $names
	file_name=`echo $names | sed 's/\//#/g'`
#	echo $file_name

	url_safe=`echo $names | sed 's/\//%2f/g'`
	FILE=$PWD/scripts/description_$file_name.json

#	echo $FILE
	if [[ -f $FILE ]]; then
		continue
	fi

	echo $url_safe	
	curl -s https://replicate.npmjs.com/$url_safe | jq '.versions[] .scripts' > $PWD/scripts/description_"$file_name".json

done < "$file"
