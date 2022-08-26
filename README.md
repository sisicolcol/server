# For Server
## Package Structure
```
📂 git@sisicolcol/server-js
  ┣📂 src
    ┣📂 config # db 옵션
    ┣📂 controllers # req->검사->service && service->검사->res, Controller Layer
    ┣📂 middlewares # 미들웨어들을 짱박아둔 디렉토리
    ┣📂 repositorys # DB와 직접적으로 만나는 디렉토리, DataManager Layer
    ┣📂 routers # 메서드 종류와 요청에 따른 분기를 다루는 곳
    ┣📂 services # DB와 controller 사이를 중개합니다, Service Layer
    ┣📂 utilities # response 관련 status와 함수를 모아둔 곳
    ┣📜 index.js 
  ┣📂 swagger
  ┣ .env.example 
  ┣ package.json 

```
## API 로직

1. index.js(express) - 익스프레스가 띄운 서버로 접속
2. routers/index.js - 도메인별 라우터로 분기
3. routers/*.router.js - 해당하는 도메인로 라우팅
4. controllers/*.controller.js - 유효성 검사, 인증처리 등, Controller Layer
5. services/*.service.js - DB로 데이터 전달 혹은 DB에서 뽑아온 데이터 정제, Service Layer
6. respository/*.repository.js - DB 접근 쿼리들의 집합, DataManager Layer
7. DataBase

## How to Run
```
npm run start
```


# For client

before start
```
npm install
1. .env.example이 있는 경로에 .env 파일을 생성합니다
2. 노션 워크스페이스 백엔드 - .env 파일로 들어갑니다
3. 노션에 있는 내용을 .env 파일에 복붙합니다
4. npm run start
```

how to start
```
npm run start
```

default page
```
http://localhost:3000
```

generating api on swagger
```

```

api page
```
http://localhost:3000/docs
```
