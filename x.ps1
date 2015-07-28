# ls -name *.html > html.list
# rm html.list
html2jade --outdir ./jade --donotencode --bodyless apply.html apply2.html check-in.html index.html match-info-choose.html match-info-first.html match-info-last.html match-info-middle.html match-info-table.html news-content.html news-list.html reg1.html reg2.html reg3.html reg4.html sign-in.html user-center.html user-center_news.html 
cp ./css/index.less ../crt/src/my-app/index.less