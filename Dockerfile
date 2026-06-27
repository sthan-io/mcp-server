FROM node:20-alpine
RUN npm install -g @sthan/mcp-server@0.1.4
ENTRYPOINT ["sthan-mcp-server"]
