FROM node:16.17.0
WORKDIR /usr/src/app/server
COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"] /usr/src/app/server
RUN npm install
COPY . /usr/src/app/server
EXPOSE 3000
CMD npm run dev