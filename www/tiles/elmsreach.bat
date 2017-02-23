mkdir elmsreach\5
mkdir elmsreach\4
mkdir elmsreach\3
mkdir elmsreach\6

magick elmsreach.png -crop 256x256 elmsreach\5\tile.jpg
magick elmsreach.png -resize 200%% -crop 256x256 elmsreach\6\tile.jpg
magick elmsreach.png -resize 50%% -crop 256x256 elmsreach\4\tile.jpg
magick elmsreach.png -resize 25%% -crop 256x256 elmsreach\3\tile.jpg
