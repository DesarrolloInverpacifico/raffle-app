# Etapa de construcción
FROM node:22-alpine AS builder
WORKDIR /app

# Copiar archivos necesarios
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto del código
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM node:22-alpine AS production
WORKDIR /app

# Copiar archivos necesarios desde la etapa de construcción
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Definir la variable de entorno para producción
ENV NODE_ENV=production

# Exponer el puerto
EXPOSE 3000

# Comando de inicio
CMD ["npm", "start"]