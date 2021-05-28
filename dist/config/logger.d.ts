import winston from 'winston';
declare class Singleton {
    static instance: winston.Logger;
    constructor();
    getInstance(): winston.Logger;
}
export default Singleton;
