export interface UserWithRoleDto {
    UserId: number;
    DisplayName: string;
    UserName: string;
    Email: string;
    Password: string;
    CreatedDate: Date | null;
    RoleId: number;
    RoleName: string;
  }
  