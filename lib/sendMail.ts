"use server"; // This marks the file as a server-side action

import { sendMail } from "@/lib/mail";

export async function sendMailAction({ to, name, subject, body }: { to: string, name: string, subject: string, body: string }) {
    await sendMail({ to, name, subject, body });
}