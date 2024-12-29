
import AppointmentStatusEmail from "@/templates/emails/appointment-scheduled";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend';
const resend = new Resend("re_f7epFUgS_NLRBgL9P24AjKFCuGyHBYkXx")

export async function POST(req:NextRequest,res :NextResponse) {
    
    await resend.emails.send({
        from: 'WeCare <updates@freshroots.shop>',
        to: ["nandasree3404@gmail.com"],
        subject: 'Appointment Scheduled',
        react: AppointmentStatusEmail(),
      });
    return NextResponse.json("Hello world");
    
}