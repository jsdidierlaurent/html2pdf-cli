FROM node:10.9.0-slim

# Install Deps for Chrome
RUN apt-get update && \
    apt-get install -yq \
      gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
      libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
      libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
      libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
      fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst ttf-freefont \
      ca-certificates fonts-liberation libappindicator1 libnss3 \
      lsb-release \
      xdg-utils && \
    apt-get clean && apt-get autoremove -y && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json yarn.lock ./

RUN yarn install --production && yarn cache clean

# Bundle app source
COPY . .

# Install html2pdf-cli
RUN yarn link

# Default volume and workdir for PDF
VOLUME /dest
WORKDIR /dest