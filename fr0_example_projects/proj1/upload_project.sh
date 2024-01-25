curl -X POST -H "Authorization: token mytoken_aabbccdd" -F foo=bar \
  -F readme=@./readme.md -F metadata=@./project.fm1.json \
  -F thumbnail=@./thumbnail.jpg -F firmware=@./.pio/build/generic/firmware.uf2 \
  http://localhost:3000/api/project/upload
