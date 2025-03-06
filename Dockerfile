# ---------------------
# Stage 1: Збірка (build)
# ---------------------
FROM node:18-alpine AS build
WORKDIR /app

# Копіюємо package.json та yarn.lock для встановлення залежностей
COPY package.json yarn.lock ./

# Встановлюємо залежності за допомогою Yarn
RUN yarn install

# Копіюємо весь код проекту
COPY . .

# Виконуємо збірку проекту
# (За замовчуванням вихідна папка – "dist". Якщо у вас інша, наприклад, "build" для React, змініть нижче відповідним чином)
RUN yarn build

# ---------------------
# Stage 2: Сервінг через Nginx
# ---------------------
FROM nginx:alpine

# Копіюємо зібрані файли з папки "dist" у папку, яку використовує Nginx для сервінгу
COPY --from=build /app/dist /usr/share/nginx/html

# Відкриваємо порт 80
EXPOSE 80

# Запускаємо Nginx у передньому режимі (daemon off, щоб контейнер не завершував роботу)
CMD ["nginx", "-g", "daemon off;"]
