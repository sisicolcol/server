
### Package Structure

```

๐ git@sisicolcol/server-js
  โฃ๐ src
    โฃ๐ config # db ์ต์
    โฃ๐ controllers # req->๊ฒ์ฌ->service && service->๊ฒ์ฌ->res, Controller Layer
    โฃ๐ middlewares # ๋ฏธ๋ค์จ์ด๋ค์ ์งฑ๋ฐ์๋ ๋๋ ํ ๋ฆฌ
    โฃ๐ repositorys # DB์ ์ง์ ์ ์ผ๋ก ๋ง๋๋ ๋๋ ํ ๋ฆฌ, DataManager Layer
    โฃ๐ routers # ๋ฉ์๋ ์ข๋ฅ์ ์์ฒญ์ ๋ฐ๋ฅธ ๋ถ๊ธฐ๋ฅผ ๋ค๋ฃจ๋ ๊ณณ
    โฃ๐ services # Controller์์ ๋น์ฆ๋์ค ๋ก์ง์ ๋ถ๋ฆฌํ ๊ณณ, Service Layer
    โฃ๐ utilities # response ๊ด๋ จ status์ ํจ์๋ฅผ ๋ชจ์๋ ๊ณณ
    โฃ๐ index.js
  โฃ๐ swagger
  โฃ .env.example
  โฃ package.json
  
```

### API ๋ก์ง

1. index.js(express) - ์ต์คํ๋ ์ค๊ฐ ๋์ด ์๋ฒ๋ก ์ ์
2. routers/index.js - ๋๋ฉ์ธ๋ณ ๋ผ์ฐํฐ๋ก ๋ถ๊ธฐ
3. routers/\*.router.js - ํด๋นํ๋ ๋๋ฉ์ธ๋ก ๋ผ์ฐํ
4. controllers/\*.controller.js - ์ ํจ์ฑ ๊ฒ์ฌ, ์ธ์ฆ์ฒ๋ฆฌ ๋ฑ, Controller Layer
5. services/\*.service.js - DB๋ก ๋ฐ์ดํฐ ์ ๋ฌ ํน์ DB์์ ๋ฝ์์จ ๋ฐ์ดํฐ ์ ์ , Service Layer
6. respository/\*.repository.js - DB ์ ๊ทผ ์ฟผ๋ฆฌ๋ค์ ์งํฉ, DataManager Layer
7. DataBase

#### How to Run

```
npm run start
๊ฐ๋ฐ์: npm run dev (nodemon)
```