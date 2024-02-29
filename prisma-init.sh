# prisma 사용 위해서 실행해야될 명령어들

# 이전 prisma를 삭제한다.
# npm uninstall prisma

# prisma 설치
npm install prisma --save-dev

# prisma 정상 설치 확인
npx prisma

# prisma Client 생성
npx prisma generate

# model(Tables) 생성
npx prisma db push