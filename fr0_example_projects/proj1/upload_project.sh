curl -X POST -H "Authorization: token mytoken_aabbccdd" \
  -F readme=@./readme.md -F metadata=@./project.fm1.json \
  -F thumbnail=@./thumbnail.jpg -F firmware=@./.pio/build/generic/firmware.uf2 \
  https://firmix.deno.dev/api/project/upload

