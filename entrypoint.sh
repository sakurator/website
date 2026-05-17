#!/bin/sh
set -e

npx prisma generate
npx prisma migrate dev --name init
npx prisma migrate deploy
npx prisma db seed
exec "$@"
