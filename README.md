# Next.js 9.4.1 + TypeScript + redux-observable starter

Still WIP.

- [ ] Use middleware or something for Authentication
- [ ] Set alias for `import { foo } from '~/foo'`
- [ ] Remove 'any' type from epic

```
yarn install
yarn dev
```

## Try SSR on k8s

Enable your kubernetes cluster and run following command.

```
make run-next
```

## Use GraphQL + BFF and communicate Backend with gRPC

Requirements:
- [Helm3](https://helm.sh/docs/intro/install/)
- [https://github.com/golang-migrate/migrate](https://github.com/golang-migrate/migrate)

```
make init

# MySQL will run your local (port: 32000, user: root, pw: root)
make install-mysql

make migrate-up

```

if you'd like to remove all, just run

```
make cleanup
```

