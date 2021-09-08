# If you only read one thing, read the `provision.sql` file

# SQL Migrataion scratchpad Folder

This is a folder to test out some ideas for migrating and defining the sql schemas in the postgres database that will be the target for the migration away from fauna

## Quick Start

1. Make sure you have docker installed and working, im running a postgres image there atm
2. `docker-compose up` should start the image. I've exposted the port on 5439 so it doesn't clash with other things on my system but you're welcome to change this.
3. Be aware the connection string is in the .env file. This is just a test to its `jondoe`, `randompassword` for now.
4. `npm install`. The Prisma directory has 3 things
   - **dbml**. Every time we run `npx prisma generate` a new .dbml file is made. You can paste this at `https://dbdiagram.io/d` and check out the visualizer
   - **migrations**. This is where every named migration lives. Once we've made a good schema we can put thes in a .old folder and jsut make the one init migration but in the meantime you can observe the sort of sql prisma emits here
   - **schema.prisma**. The actual Prisma schema!

The commands you care about most are:

1. `npx prisma migrate dev` : will create a named migration, and you can go look at the sql
2. `npx prisma generate` : will make the client code and the dbml. Generators are defined at the top of the .prisma file
3. `npx prisma studio`: starts up prisma's table inspector

## Here's the important links:

#### Prisma examples

[https://github.com/prisma/prisma-examples/tree/latest/typescript](https://github.com/prisma/prisma-examples/tree/latest/typescript)

Just a repo with a bunch of ways you can use and import the generated prisma client with like next, next, apollo and so on.

#### Prisma Docs (spedifically relationships)

[https://www.prisma.io/docs/concepts/components/prisma-schema/relations](https://www.prisma.io/docs/concepts/components/prisma-schema/relations)

Prisma is pretty quick and easy to read, but this is nice becuase this is 'the way' to make the various relationship types according to prisma (1-1 1-many many-many). Most important directive is @relationship

#### Vs Code Tool

[https://marketplace.visualstudio.com/items?itemName=Prisma.prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)

Honestly this just makes it a lot easier, at least in VS code. If you don't use Vs Code there might be similar tooling. Gives you the linting and the syntax highlighting

