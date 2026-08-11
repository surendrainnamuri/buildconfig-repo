FROM registry.access.redhat.com/ubi9/nginx-124:latest

COPY --chown=1001:0 index.html styles.css app.js /opt/app-root/src/
COPY --chown=1001:0 nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080
USER 1001
CMD ["nginx", "-g", "daemon off;"]
