import React, { CSSProperties } from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Img,
  Heading,
  Text,
  Hr,
  Link,
} from "@react-email/components";
import { Clock4, MapPin, Stethoscope, CalendarCheck } from "lucide-react";

const AppointmentStatusEmail = () => (
  <Html>
    <Head />
    <Preview>10:30am at WeCare Hospitals</Preview>
    <Body className="">
      <Container className="border-2">
        <div className="text-center flex flex-col items-center p-3">
          <Heading className="font-semibold">
            Your appointment is scheduled
          </Heading>
          <Text>
            We sent an email with a calendar invitation with the details to the
            doctor.
          </Text>
        </div>
        <Hr />
        <p className="text-center font-bold text-[2rem] my-3">
          Standard Checkup
        </p>
        <Section className="">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-3">
              <p className="font-semibold">When :</p>
              <Text>Sunday, June 12, 2024</Text>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-semibold">Time :</p>
              <Text>10:45am - 11:30am</Text>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-semibold">Doctor :</p>

              <Text>Dr. Nandasree</Text>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-semibold">Location :</p>

              <Text className="text-muted-foreground">WeCare Hospitals</Text>
            </div>
          </div>
        </Section>
        <Hr />
        <Section className="text-center">
          <Text>
            Need to make a change? &nbsp;
            <Link href="/appointment/reschedule">Reschedule</Link>
            &nbsp; or &nbsp;
            <Link href="/appointment/cancel">Cancel</Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default AppointmentStatusEmail;
