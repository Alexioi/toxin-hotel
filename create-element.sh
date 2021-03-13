#!/bin/bash

echo -n "Creat component/page?(C/p): "
read dir

if [[ $dir = "p" ]] 
  then dir='pages'
else
  dir='components'
fi

mkdir ./src/$dir/$1
mkdir ./src/$dir/$1/img
echo "import './$1.scss';" >> ./src/$dir/$1/$1.js
echo "@import '../../style/variables.scss';" >> ./src/$dir/$1/$1.scss
echo -e "mixin ${1}(options)\n  if !options\n    - options = {}" >> ./src/$dir/$1/$1.pug
