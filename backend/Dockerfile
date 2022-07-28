FROM node:16.15.0
WORKDIR /root
COPY . .
RUN npm cache clean --force
RUN npm install
RUN npm uninstall bcrypt @types/bcrypt
RUN npm install bcrypt @types/bcrypt
EXPOSE 8080

