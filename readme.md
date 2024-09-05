# Steps to run this application clone the repo

- 1. Open terminal & check for local mysql server if running stop that
- 2. Run > 
```bash
docker-compose -f docker-compose.initial.yml up --build -d
docker-compose -f docker-compose.initial.yml down
docker-compose -f docker-compose.final.yml up --build -d
```

This will load initial data first and then will transform it

- 3. Go to /backend and run
```bash
pnpm install
pnpm start:dev
``` 

- 4. Go to /frontend and run
```bash
pnpm install
pnpm run dev
``` 

- 5. Check in brower go to http://localhost:5173/

### if it is not running or getting any error check if PORT 5173 and 3000 are not occupied already