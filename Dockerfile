FROM node:18.16.1-bullseye

RUN apt-get update -y && apt-get install -y \
	dos2unix

WORKDIR /app

COPY package* .

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm","run","start"]