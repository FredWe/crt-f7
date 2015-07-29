$m = read-host "Please enter message for 'CRT-f7'"
git add .
git commit -a -m $m
git push origin gh-pages 
