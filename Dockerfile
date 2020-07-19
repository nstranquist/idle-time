# React App for Idle Time

FROM node:14.5.0-buster-slim as react-build

# Connection to Database
#! Not Currently in Use
ENV API_CONN='http://localhost:160'

# Copy and Install Dependencies
RUN mkdir /app
WORKDIR /app
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
RUN yarn install

# Copy APP
COPY public /app/public
COPY src /app/src

# Build the App
RUN yarn build

# Start a Production Environment
FROM nginx:alpine
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 80

# Start the Server
CMD ["nginx", "-g", "daemon off;"]
#CMD ["react-scripts", "start"]