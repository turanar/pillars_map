mkdir cliabanrilag\5
mkdir cliabanrilag\4
mkdir cliabanrilag\3
mkdir cliabanrilag\6

magick cliabanrilag.png -crop 256x256 cliabanrilag\5\tile.jpg
magick cliabanrilag.png -resize 200%% -crop 256x256 cliabanrilag\6\tile.jpg
magick cliabanrilag.png -resize 50%% -crop 256x256 cliabanrilag\4\tile.jpg
magick cliabanrilag.png -resize 25%% -crop 256x256 cliabanrilag\3\tile.jpg
