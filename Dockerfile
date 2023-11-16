FROM nginx
RUN ["rm" ,"-rf", "/usr/share/nginx/html/*"]
COPY ./default.conf /etc/nginx/conf.d/p.conf
COPY build /usr/share/nginx/app
EXPOSE 3000