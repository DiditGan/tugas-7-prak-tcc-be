FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 5000
RUN npm install -g nodemon
CMD ["nodemon", "index.js"]