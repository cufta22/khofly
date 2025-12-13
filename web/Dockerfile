# Stage 1: Install & Build
FROM node:25-slim AS stage-build

WORKDIR /app/web

COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production Runtime
FROM node:25-slim AS stage-final

RUN addgroup --gid 1001 userweb && \
    adduser --uid 1001 --ingroup userweb --shell /bin/false --disabled-password userweb

WORKDIR /app/web

# Copy files from build stage
COPY --from=stage-build /app/web/node_modules ./node_modules 
COPY --from=stage-build /app/web/package.json ./package.json 
COPY --from=stage-build /app/web/build ./build 

# Set ownership of the runtime files to the non-root user
RUN chown -R userweb:userweb /app/web

USER userweb

EXPOSE 3000

CMD ["npm", "run", "start"]