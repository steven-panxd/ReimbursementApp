# Build stage
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build --configuration=production

# Serve stage
FROM nginx:alpine
COPY --from=build /app/dist/reimbursement-app-frontend/browser /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]