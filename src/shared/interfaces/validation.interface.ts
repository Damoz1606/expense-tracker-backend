export interface IValidator {
    validate: (data: any) => any | Promise<any>;
}