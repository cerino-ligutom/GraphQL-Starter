/* eslint-disable arrow-body-style */

import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { loadFiles } from '@graphql-tools/load-files';
import { makeExecutableSchema } from 'apollo-server-express';
import * as scalars from './scalars';
import * as enums from './enums';
import { GraphQLSchema } from 'graphql';

const getTypeDefs = async () => {
  return loadFiles('src/modules/**/*.graphql');
};

const getResolvers = async () => {
  return loadFiles('src/modules/**/graphql/resolvers/index.*', { ignoreIndex: false, extensions: ['.js', '.ts'] });
};

export const initializeSchema = async (): Promise<GraphQLSchema> => {
  const resolvers = {
    ...mergeResolvers(await getResolvers()),
    ...enums,
    ...scalars,
  };

  const typeDefs = mergeTypeDefs(await getTypeDefs());

  const graphqlSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
    logger: { log: (e) => console.info(e) },
  });

  return graphqlSchema;
};
