export interface userAdmin {
    id: number;
    username: string;
    email: string;
    password?: string;  // Opcional para actualizaciones si no se cambia
    subscriptionId: number;
    isActive: boolean;  // Para saber si el usuario está activo o dado de baja
  }