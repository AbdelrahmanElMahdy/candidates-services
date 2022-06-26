FROM node
RUN npm install typescript -g
WORKDIR /candidates
COPY . .
RUN npm install
RUN npm run build
COPY .env ./dist/
CMD ["npm","run","start"]
EXPOSE 5005