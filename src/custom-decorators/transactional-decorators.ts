// import { Connection } from 'typeorm';
//
//
// export function Transactional() {
//   return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//     const originalMethod = descriptor.value;
//
//     descriptor.value = async function (...args: any[]) {
//       if (!this.connection || !(this.connection instanceof Connection)) {
//         throw new Error('Connection is not available or invalid');
//       }
//
//       return await this.connection.transaction(async (manager) => {
//         return await originalMethod.apply(this, [manager, ...args]);
//       });
//     };
//
//     return descriptor;
//   };
// }
