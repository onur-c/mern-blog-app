# Blog App
Created with MongoDB, Express, React and Node.js

## Preview
  - You can register & login.
  - You can create posts with title,description,image and markdown content.
    - Note: image uploads gets created at backend/uploads folder.
  - You can edit your post.


### First clone the repository
```
git clone https://github.com/onur-c/mern-blog-app.git
```
### Then run in root and frontend directory
```
npm install
```
### Set your own .env variables at the root directory
```

MONGO_SECRET=MONGO_SECRET

JWT_SECRET=JWT_SECRET

CORS_ORIGIN=CORS_ORIGIN

PORT=4000

```

### Lastly run in frontend directory
```
npm run build
```
### Lastly run in root directory
```
npm run dev
```
