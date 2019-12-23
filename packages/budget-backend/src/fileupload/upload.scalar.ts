import { Scalar, CustomScalar } from '@nestjs/graphql';
import { GraphQLUpload } from 'graphql-upload';

@Scalar('Upload')
export class UploadScalar implements CustomScalar<object, string> {
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
