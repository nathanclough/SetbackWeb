import openSocket from 'socket.io-client';
import { Home } from './Home';

const  sio = openSocket('http://localhost:8000');
const home = new Home(sio);

function onConnection(cb){
    sio.on('connect', () => {
        cb()
        console.log('connected')
    });
}


sio.on('disconnect', () => {
    console.log('disconnected');
});

sio.on('sum_result',(data) => {
    console.log(data);
})

sio.on('mult',(data,cb) =>{
    const result = data.numbers[0] * data.numbers[1];
    cb(result)
})

sio.on('client_count',(data) => {
    console.log("total clients",data['total_clients'])
})

export {home}