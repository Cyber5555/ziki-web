import Pusher from "pusher-js";

export const pusher = new Pusher("ee8b67274fccf540b81e", {
  appId: "1651282",
  secret: "0cbc75cacff02b16b2c9",
  cluster: "ap2",
  // encrypted: true,
});
