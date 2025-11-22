import { SetMetadata } from "@nestjs/common"

export enum Role {
    ADMIN = "ADMIN",
    MODERATOR = "MODERATOR",
    CUSTOMER = "CUSTOMER"
}
export const Roles_Key = "roles"
export const Roles = (roles: Role[]) => SetMetadata(Roles_Key, roles);