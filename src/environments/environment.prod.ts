export const environment = {
  production: true,
  defaultLanguage: 'es-AR',
  baseUrl: 'https://dsw-backend-dev-hacx.4.us-1.fl0.io/api/',
  apis: {
    loginValidator: 'auth/login',
    userApis: {
      user: 'usuario'
    },
    clientApis: {
      client: 'cliente'
    },
    roomApis: {
      room: 'habitacion',
      searchRooms: 'habitacion/lista',
      roomTypes: 'habitacion/tipo/getTiposHabitacion'
    },
    reserveApis: {
      reserve: 'reserva'
    }
  }
};
