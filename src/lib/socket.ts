import { io, type Socket } from "socket.io-client";


export const socket: Socket = io(import.meta.env.VITE_API_ORIGIN, {
  withCredentials: true,
  autoConnect: false,
});