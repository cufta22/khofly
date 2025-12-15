# Stage 1: Install & Build
FROM docker.io/oven/bun:debian AS build-stage

# Install dependencies needed for stuff below
RUN apt-get update && \
    apt-get install -y --no-install-recommends ca-certificates ffmpeg curl && \
    rm -rf /var/lib/apt/lists/*

# Install yt-dlp as dependency
RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp && \
    chmod a+rx /usr/local/bin/yt-dlp

# Install gallery-dl as dependency
RUN curl -L https://github.com/mikf/gallery-dl/releases/latest/download/gallery-dl.bin -o /usr/local/bin/gallery-dl && \
    chmod a+rx /usr/local/bin/gallery-dl

WORKDIR /app/api

COPY package.json ./
RUN bun install
COPY . .

# Stage 2: Production Runtime
FROM docker.io/oven/bun:debian AS final-stage

RUN addgroup --gid 1001 userapi && \
    adduser --uid 1001 --ingroup userapi --shell /bin/false --disabled-password userapi

WORKDIR /app/api

# Copy yt-dlp and it's dependencies
COPY --from=build-stage /usr/bin/ffmpeg /usr/bin/ffmpeg
COPY --from=build-stage /usr/lib/x86_64-linux-gnu/lib* /usr/lib/x86_64-linux-gnu/
COPY --from=build-stage /usr/local/bin/yt-dlp /usr/local/bin/yt-dlp

# Copy gallery-dl and it's dependencies
COPY --from=build-stage /usr/local/bin/gallery-dl /usr/local/bin/gallery-dl

# Copy files from build stage
COPY --from=build-stage /usr/local/bun-cache /usr/local/bun-cache
COPY --from=build-stage /app/api/node_modules ./node_modules
COPY --from=build-stage /app/api/package.json ./package.json
COPY --from=build-stage /app/api/src ./src
COPY --from=build-stage /app/api/temp ./temp
COPY --from=build-stage /app/api/cookies-yt.txt ./cookies-yt.txt
COPY --from=build-stage /app/api/cookies-ig.txt ./cookies-ig.txt

# Set ownership of the runtime files to the non-root user
RUN chown -R userapi:userapi /app/api

USER userapi

EXPOSE 4000

CMD ["bun", "run", "start"]