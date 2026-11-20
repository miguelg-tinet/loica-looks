#!/bin/zsh
# Imprime una escena y, con "publicar", exporta los cuatro tamaños a las carpetas del sitio.
#   taller/generar.sh Chile-Chico            → solo deja la prueba en taller/.salida/
#   taller/generar.sh Chile-Chico publicar   → además escribe Vistas/, Videollamadas/ y Escritorio/
# Requiere Google Chrome, sips (macOS) y cwebp.
set -e
N="$1"; T="${0:A:h}"; R="${T:h}"; O="$T/.salida"; mkdir -p "$O"
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
shot() { # ancho alto salida url
  "$CH" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files --force-device-scale-factor=1 \
    --window-size=$1,$2 --virtual-time-budget=120000 --user-data-dir="$O/.perfil" --screenshot="$3" "$4" </dev/null >"$O/chrome.log" 2>&1 &
  local p=$!; for i in {1..100}; do kill -0 $p 2>/dev/null || break; sleep 1; done; kill $p 2>/dev/null || true
  [[ -s "$3" ]] || { echo "No se generó $3"; tail -3 "$O/chrome.log"; exit 1 }
}
rm -f "$O/$N.png"
shot 3840 2160 "$O/$N.png" "file://$T/escena.html?e=$N"
sips -s format jpeg -Z 1100 "$O/$N.png" --out "$O/$N-prueba.jpg" >/dev/null 2>&1
echo "Prueba: $O/$N-prueba.jpg"
[[ "$2" == publicar ]] || exit 0
rm -f "$O/$N-video.png"
shot 1920 1080 "$O/$N-video.png" "file://$T/logo.html?img=.salida/$N.png"
sips -s format jpeg -s formatOptions 90 "$O/$N.png" --out "$R/Escritorio/$N.jpg" >/dev/null 2>&1
sips -z 1440 2560 "$O/$N.png" --out "$O/q.png" >/dev/null 2>&1
sips -s format jpeg -s formatOptions 90 "$O/q.png" --out "$R/Escritorio/QHD/$N.jpg" >/dev/null 2>&1
sips -s format jpeg -s formatOptions 90 "$O/$N-video.png" --out "$R/Videollamadas/$N.jpg" >/dev/null 2>&1
sips -z 810 1440 "$O/$N.png" --out "$O/v.png" >/dev/null 2>&1
cwebp -quiet -q 84 "$O/v.png" -o "$R/Vistas/$N.webp"
echo "Publicado: $N"
