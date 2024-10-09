FROM node:18.15.0
LABEL Alan Eicker
WORKDIR /src
COPY package.json . /src/
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
