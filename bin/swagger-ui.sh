#!/usr/bin/env sh

VERSION=5.20.1
ROOT=$(dirname $(dirname $(realpath $0)))
BIN=$ROOT/bin
DIST=$ROOT/dist
WORK=$ROOT/work

rm -rf $DIST $WORK
mkdir -p $WORK

cd $WORK
echo $(pwd)
wget "https://github.com/swagger-api/swagger-ui/archive/refs/tags/v$VERSION.tar.gz"
tar xzf "v$VERSION.tar.gz"
cp -r swagger-ui-$VERSION/dist $ROOT
cd $ROOT
rm -rf $WORK

cp $BIN/swagger-initializer.js $DIST
cp $ROOT/openapi.yaml $DIST
