import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';

export default function() {
	const socket = io.connect('http://localhost:3030');
	return socket;
}