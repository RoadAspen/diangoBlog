FROM dockerhub.tezign.com/library/nginx-nodejs-commons-new:v12

COPY ./dist/ /data/blog/frontend

RUN chmod +x /data/blog/frontend/docker-entrypoint.sh

EXPOSE 80

CMD ["/data/blog/frontend/docker-entrypoint.sh"]
