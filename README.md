# nas-downtime-notify
> this is a small nodejs application that's notifying me if my local nas went down

### Install node dependencies

```bash
yarn

// create .env file
cp .env.example .env
```

### Build
```bash
yarn build
```

### Run

```bash
node build/index.js
```

### PM2

```bash
pm2 start pm2.json
```

## License

MIT License - 2018 - [Dominic Kolbe](https://dominickolbe.dk)
