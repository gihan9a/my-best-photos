FROM node:14.16.1-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm ci
COPY . ./
EXPOSE 4000
CMD ["npm", "run", "start"]