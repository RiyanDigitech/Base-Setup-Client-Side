import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
  interface Window {
    Pusher: any;
  }
}

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: 'pusher',
  key: '13ded0801b48055b1368',
  cluster: 'ap3',
  forceTLS: true,
});

export default echo;
