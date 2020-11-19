import { Scalar, CustomScalar } from '@nestjs/graphql';
// import { GraphQLUpload } from 'graphql-upload';
import { GraphQLUpload } from 'apollo-server-express';


@Scalar('Upload')
export class Upload {
  createReadStream(): any {
    throw new Error('Method not implemented.');
  }
  description = 'Upload custom scalar type';

  parseValue(value) {
    return GraphQLUpload.parseValue(value);
  }

  serialize(value: any) {
    return GraphQLUpload.serialize(value);
  }

  parseLiteral(ast) {
    return GraphQLUpload.parseLiteral(ast, ast.value);
  }

}
