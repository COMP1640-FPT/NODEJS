# ---- base ----
FROM node:alpine as base

EXPOSE 8001

WORKDIR /app

RUN npm install -g nodemon

COPY package.json .

# ---- dependencies ----
FROM base as dependencies

RUN npm set progress=false && npm config set depth 0 \
    && npm install --only=production \
    && cp -R node_modules prod_node_modules 

# ---- Release ----
FROM base AS release

WORKDIR /app

COPY --from=dependencies app/prod_node_modules ./node_modules

COPY . .

CMD ["npm", "run", "dev"]