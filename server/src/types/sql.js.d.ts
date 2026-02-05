declare module 'sql.js' {
  export class Database {
    run(sql: string, params?: any[]): void;
    exec(sql: string): Array<{ columns: string[]; values: any[][] }>;
    prepare(sql: string): Statement;
    export(): Uint8Array;
    saveToFile(filename: string): void;
  }
  export interface Statement {
    run(params: any[]): void;
    step(): boolean;
    get(params?: any[]): any;
    getAsObject(): any;
    free(): void;
    bind(params: any[]): boolean;
  }
  export default function initSqlJs(config?: { locateFile: (file: string) => string }): Promise<{ Database: typeof Database }>;
}

