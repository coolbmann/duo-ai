type Listener = () => void;

let open = false;
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((l) => l());
}

export const requestModalStore = {
  isOpen: () => open,
  open: () => { open = true; notify(); },
  close: () => { open = false; notify(); },
  subscribe: (fn: Listener) => {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
};
