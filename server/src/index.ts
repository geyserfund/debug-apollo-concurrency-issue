import express, { Express, Request, Response } from "express";
import { ApolloServer } from '@apollo/server';
import gql from "graphql-tag";
import dotenv from "dotenv";
import http from "http";
import bodyParser from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';

dotenv.config();

const app: Express = express();

// 2. Define Schema
const typeDefs = gql`
  type User {
    id: ID!
  }

  type Query {
    getUsers(userId: ID!): User
  }
`;

// 3. Define Resolvers
const users = [
    { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 },
    { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 },
    { id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 },
    { id: 16 }, { id: 17 }, { id: 18 }, { id: 19 }, { id: 20 },
    { id: 21 }, { id: 22 }, { id: 23 }, { id: 24 }, { id: 25 },
    { id: 26 }, { id: 27 }, { id: 28 }, { id: 29 }, { id: 30 },
]

const resolvers = {
    Query: {
        getUsers: async (_: any, { userId }: { userId: string }) => {
            // Implement your logic to fetch the user by userId
            // This example returns a mock user for demonstration
            return new Promise(resolve => {
                setTimeout(() => {
                    return resolve(users.find((user) => user.id === parseInt(userId)))
                }, Math.random() * 100)
            })
        },
    },
};

// 4. Create Apollo Server Instance
const apolloServer = new ApolloServer({ typeDefs, resolvers });

const httpServer = http.createServer(app);

// 5. Start the Server
apolloServer.start().then(() => {
    app.use(cors({
        origin: ['http://localhost:3000'],
        credentials: true,
    }));

    app.get("/", (req: Request, res: Response) => {
        res.send("Express + TypeScript Server");
    });

    app.use(
        '/graphql',
        cors<cors.CorsRequest>({ origin: ['http://localhost:3001'], credentials: true }),
        bodyParser.json({ limit: '10mb' }),
        expressMiddleware(apolloServer, {
            // context: createContext,
        }),
    )

    httpServer.listen({ port: 4001 }, () => {
        console.log(`[server]: Server is running at http://localhost:4001`);
    });
});