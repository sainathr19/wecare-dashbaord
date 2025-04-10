import Link from "next/link";
import { ArrowRight, Calendar, ClipboardList, HeartPulse, Shield, Stethoscope, Users, Brain, Bell, Smartphone, CheckCircle2, Activity, Laptop } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 text-transparent bg-clip-text">
            WeCare
          </h1>
          <div className="space-x-4">
            <Link 
              href="/auth/signin" 
              className="px-4 py-2 rounded-lg text-primary hover:bg-primary/10 transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/auth/signup" 
              className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-32 pb-5">
        <section className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8 max-w-3xl">
            Experience a New Era of Healthcare
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl">
            Stay connected with doctors, track your health, and manage appointments effortlessly with our comprehensive remote monitoring solution
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-md">
            <Link 
              href="/auth/signup?role=patient" 
              className="px-8 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2"
            >
              Join as Patient <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/auth/signup?role=doctor" 
              className="px-8 py-3 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors inline-flex items-center justify-center gap-2"
            >
              Join as Doctor <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
        <section className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl bg-white shadow-sm border flex flex-col items-center text-center">
            <HeartPulse className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-4">Health Monitoring</h3>
            <p className="text-gray-600">Track vital signs and health metrics in real-time.</p>
          </div>
          <div className="p-6 rounded-xl bg-white shadow-sm border flex flex-col items-center text-center">
            <ClipboardList className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-4">Digital Records</h3>
            <p className="text-gray-600">Access your medical history and reports anytime, anywhere.</p>
          </div>
          <div className="p-6 rounded-xl bg-white shadow-sm border flex flex-col items-center text-center">
            <Calendar className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-4">Smart Scheduling</h3>
            <p className="text-gray-600">Effortlessly manage appointments with intelligent scheduling system.</p>
          </div>
        </section>
        <section className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose WeCare?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center text-center gap-4">
              <Shield className="w-8 h-8 text-primary" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
                <p className="text-gray-600">Your health data is protected with enterprise-grade security.</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
              <Stethoscope className="w-8 h-8 text-primary" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Expert Care</h3>
                <p className="text-gray-600">Connect with qualified healthcare professionals.</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
              <Users className="w-8 h-8 text-primary" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Patient-Centric</h3>
                <p className="text-gray-600">Designed around your needs and convenience.</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
              <HeartPulse className="w-8 h-8 text-primary" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Preventive Care</h3>
                <p className="text-gray-600">Early detection and continuous monitoring for better health outcomes.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-24 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center mb-12">Powered by Advanced Technology</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center text-center gap-4">
              <Smartphone className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Device Integration</h3>
                <p className="text-gray-600">Seamlessly connect with your medical devices and wearables.</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
              <Activity className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Real-time Monitoring</h3>
                <p className="text-gray-600">Track vital signs and health metrics continuously.</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
              <Brain className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">AI-Driven Insights</h3>
                <p className="text-gray-600">Smart algorithms analyze your health data to predict and prevent potential issues.</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
              <Bell className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Smart Alerts</h3>
                <p className="text-gray-600">Receive timely notifications about critical health changes.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">How WeCare Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Create Your Profile",
                description: "Sign up and enter your health information to get started.",
                icon: Users
              },
              {
                step: "2",
                title: "Connect Devices",
                description: "Sync your medical devices and wearables for automatic tracking.",
                icon: Laptop
              },
              {
                step: "3",
                title: "Get Care",
                description: "Receive personalized care and monitor your health progress.",
                icon: CheckCircle2
              }
            ].map((item) => (
              <div key={item.step} className="relative p-6 rounded-xl bg-white shadow-sm border text-center">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <div className="flex flex-col items-center">
                  <item.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Who is WeCare For?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Patients with Chronic Conditions",
              "Elderly & At-Risk Individuals",
              "Post-Surgery Recovery",
              "Caregivers & Family Members"
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 p-4 rounded-lg bg-white shadow-sm border">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="my-24 text-center max-w-2xl mx-auto pb-10">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Healthcare Experience?</h2>
          <p className="text-gray-600 mb-8">Join thousands of users who trust WeCare for their health monitoring needs.</p>
          <Link 
            href="/auth/signup" 
            className="px-8 py-4 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors inline-flex items-center gap-2 text-lg"
          >
            Get Started Now <ArrowRight className="w-5 h-5" />
          </Link>
        </section>
      </main>
    </div>
  );
}
