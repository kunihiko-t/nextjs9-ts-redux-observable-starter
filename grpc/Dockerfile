FROM golang:1.14-alpine3.11 as builder

RUN mkdir /app
ADD . /app
WORKDIR /app

RUN go build -o main .


FROM alpine:3.11

WORKDIR /app

COPY --from=builder /app/main /app/main
COPY --from=builder /app/dbconf.yml /app/dbconf.yml
CMD ["./main"]
