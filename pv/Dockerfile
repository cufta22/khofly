# Stage 1: Install & Build
FROM docker.io/oven/bun:debian AS build-stage

WORKDIR /app/pv

COPY package.json ./
RUN bun install
COPY . .

# Stage 2: Production Runtime
FROM docker.io/oven/bun:debian AS final-stage

RUN addgroup --gid 1001 userpv && \
    adduser --uid 1001 --ingroup userpv --shell /bin/false --disabled-password userpv

WORKDIR /app/pv

# Copy files from build stage
COPY --from=build-stage /usr/local/bun-cache /usr/local/bun-cache
COPY --from=build-stage /app/pv/node_modules ./node_modules
COPY --from=build-stage /app/pv/package.json ./package.json
COPY --from=build-stage /app/pv/src ./src

# Set ownership of the runtime files to the non-root user
RUN chown -R userpv:userpv /app/pv

USER userpv

EXPOSE 4001

CMD ["bun", "run", "start"]