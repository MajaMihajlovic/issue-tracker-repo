import { Store } from "cx/data";

export const store = new Store();

store.set("user", localStorage.getItem('user'));
