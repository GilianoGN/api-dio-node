import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("usuarios")
class User {
    @PrimaryGeneratedColumn("uuid")
    "id": string; // Você pode usar @PrimaryGeneratedColumn("uuid") se preferir

    @Column({type: "varchar"})
    "nome": string;

    @Column({type: "varchar"})
    "email": string;
}

export { User }