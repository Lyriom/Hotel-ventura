export interface IReservaRepository {
create(payload: any): Promise<any>;
findAll(): Promise<any[]>;
findOne(id: number): Promise<any | null>;
update(id: number, payload: any): Promise<any>;
remove(id: number): Promise<any>;
}