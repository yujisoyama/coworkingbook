FROM node:16.17.0
WORKDIR /usr/src/app/web
COPY ["package.json", "package-lock.json", "tsconfig.json", "./"] /usr/src/app/web
RUN npm install
COPY . /usr/src/app/web
EXPOSE 5137
CMD npm run dev