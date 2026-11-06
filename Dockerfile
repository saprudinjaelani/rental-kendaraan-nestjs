# Menggunakan sistem operasi Linux ringan dengan Node.js 18
FROM node:18-alpine

# Membuat folder kerja di dalam Docker
WORKDIR /app

# Menyalin file daftar dependensi dan menginstalnya
COPY package*.json ./
RUN npm install

# Menyalin seluruh file project (termasuk folder prisma dan src)
COPY . .

# Menggenerate Prisma dan membangun (build) aplikasi NestJS
RUN npx prisma generate
RUN npm run build

# Membuka jalur port 3000 agar bisa diakses
EXPOSE 3000

# Perintah wajib untuk menyalakan aplikasi di dalam Docker
CMD ["npm", "run", "start:prod"]