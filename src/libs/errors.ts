import { Error, ValidationErrorItem } from 'sequelize';

class CustomError extends Error {
  public path: string
  constructor (message: string, path?: string) {
    super(message);
    this.path = path;
  }
}

export const FailValidation = (errors: ValidationErrorItem[]) => {
  const messages: any = {};
  errors.forEach((error) => {
    const path = (error.original as CustomError)?.path || error.path;
    const message = (error.original as CustomError)?.message || error.message;
    messages[path] ||= [];
    messages[path].push(message);
  });
  return {
    code: 120,
    messages,
  };
};
