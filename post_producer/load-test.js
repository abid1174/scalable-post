import http from 'k6/http';
import { sleep } from 'k6';


export const options = {
    stages: [
        { duration: '1m', target: 500 },    // ramp up to 500 VUs over 1 minute
        { duration: '5m', target: 1000 },   // increase to 1000 VUs for 5 minutes
        { duration: '5m', target: 2000 },   // increase to 2000 VUs for 5 more minutes
        { duration: '2m', target: 0 }       // ramp down to 0 VUs over 2 minutes
    ],
  };


export  default function() {
    http.post('http://host.docker.internal:8000/create-post', JSON.stringify({
        title: "Test 1",
        content: "Test content"
    }), {
        headers: {
            "Content-Type": 'application/json'
        }
    })
    sleep(1);
}


