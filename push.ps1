$m = read-host "Please enter message for 'CRT-f7'"

git checkout gh-pages
git add .
git commit -a -m $m
git push origin gh-pages

git checkout master
git add .
git commit -a -m $m
git push origin master

git checkout gh-pages