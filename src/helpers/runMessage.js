import Message from "@/components/custom/message";

export const runMessage = (type, message) => Message[type](message);
