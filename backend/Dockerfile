FROM node:16.15.0
WORKDIR /root
COPY . .
RUN npm install
RUN npm uninstall bcrypt @types/bcrypt
RUN npm install bcrypt @types/bcrypt