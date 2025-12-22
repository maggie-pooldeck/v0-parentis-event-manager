import { Button } from "@/components/ui/button"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Mail, Calendar, Plus } from "lucide-react"

export default function LandingPage() {
  return (
    <>
      <div className="relative min-h-screen bg-[#FFFEFB]">
        {/* Decorative shapes */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
          {/* Transparent background shapes */}
          <div className="absolute -left-20 top-40 h-32 w-32 rotate-45 rounded-3xl bg-[#6477D5] opacity-25"></div>
          <div className="absolute -right-16 top-20 h-40 w-40 rounded-full bg-[#F54933] opacity-20"></div>
          <div className="absolute left-10 top-[60%] h-24 w-24 rounded-full bg-[#99FADB] opacity-30"></div>
          <div className="absolute right-20 top-[40%] h-28 w-28 rotate-12 rounded-2xl bg-[#FA99E4] opacity-25"></div>
          <div className="absolute -left-10 bottom-40 h-36 w-36 rounded-full bg-[#E7FA99] opacity-30"></div>
          <div className="absolute right-10 bottom-60 h-32 w-32 rotate-45 rounded-3xl bg-[#5ECAEB] opacity-25"></div>
          <div className="absolute right-[15%] bottom-[25%] h-28 w-28 rotate-45 rounded-2xl bg-[#F54933] opacity-20"></div>
        </div>

        {/* Header */}
        <header className="relative z-10 border-b border-[#FFFEFB] bg-[#FFFEFB]/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-serif text-2xl font-semibold text-charcoal">Parentis</span>
              </div>
              <div className="flex items-center gap-3">
                <a href="mailto:hello@parentis.app">
                  <Button className="bg-[#6477D5] text-white hover:bg-[#5366C4]">Contact</Button>
                </a>
              </div>
            </nav>
          </div>
        </header>

        {/* Hero Section with Title and Email Preview */}
        <section className="relative py-16 md:py-20">
          <div className="container relative z-10 mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <div className="relative mx-auto mb-12 h-64 overflow-hidden md:h-72">
                {/* Colorful shape cluster background */}
                <div className="absolute inset-0">
                  <div className="absolute left-[10%] top-[20%] h-32 w-32 rounded-full bg-[#6477D5] opacity-75"></div>
                  <div className="absolute right-[15%] top-[10%] h-36 w-36 rotate-45 rounded-3xl bg-[#E7FA99] opacity-80"></div>
                  <div className="absolute left-[25%] top-[40%] h-28 w-28 rotate-12 rounded-2xl bg-[#99FADB] opacity-70"></div>
                  <div className="absolute right-[25%] top-[35%] h-32 w-32 rounded-full bg-[#F54933] opacity-80"></div>
                  <div className="absolute left-[45%] top-[15%] h-24 w-24 rotate-45 rounded-3xl bg-[#FA99E4] opacity-75"></div>
                  <div className="absolute right-[40%] top-[50%] h-28 w-28 rounded-full bg-[#5ECAEB] opacity-70"></div>
                </div>

                {/* Title overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <h1 className="font-serif text-6xl font-semibold text-balance text-charcoal md:text-8xl">Parentis</h1>
                </div>
              </div>

              <div className="grid gap-12 md:grid-cols-2 md:items-start">
                {/* Left: Hero Copy */}
                <div className="flex flex-col justify-center">
                  <p className="font-serif text-2xl text-charcoal text-pretty md:text-3xl">
                    This is not another app, this is a lifeline.
                  </p>
                  <p className="mt-6 text-lg leading-relaxed text-gray-600 text-pretty">
                    We're building one place to automatically extract info from all your kids' apps, emails, birthday
                    invites and more.
                  </p>
                  <p className="mt-4 font-serif text-2xl text-charcoal text-pretty md:text-3xl">Be first in line.</p>
                  <div className="mt-8">
                    <Button size="lg" className="bg-[#6477D5] text-white hover:bg-[#5366C4]">
                      Join the waitlist
                    </Button>
                  </div>
                </div>

                {/* Right: Sunday Report Email Preview */}
                <div className="flex items-center justify-center">
                  <div className="w-full max-w-md rounded-lg border border-gray-300 bg-white shadow-lg">
                    <div className="border-b border-gray-300 bg-[#FFFEFB] px-4 py-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6477D5] text-sm font-semibold text-white">
                            T
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Parentis</p>
                            <p className="text-xs text-gray-500">to me</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400">Sun 8:00 AM</span>
                      </div>
                    </div>

                    {/* Email body */}
                    <div className="p-6">
                      <h3 className="font-serif text-2xl font-semibold text-charcoal md:text-3xl">
                        Your Sunday Report
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 text-pretty">Here's what's coming up for your family</p>

                      {/* This Week */}
                      <div className="mt-6">
                        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">This Week</h4>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2 rounded-md bg-[#F54933]/10 p-3">
                            <div className="h-2 w-2 flex-shrink-0 rounded-full bg-[#F54933] mt-1.5"></div>
                            <div className="flex-1 text-sm">
                              <p className="font-medium text-charcoal">Soccer Practice - Emma</p>
                              <p className="text-xs text-gray-600">Wed, Dec 18 • 4:00 PM</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2 rounded-md bg-[#6477D5]/10 p-3">
                            <div className="h-2 w-2 flex-shrink-0 rounded-full bg-[#6477D5] mt-1.5"></div>
                            <div className="flex-1 text-sm">
                              <p className="font-medium text-charcoal">Piano Recital - Jack</p>
                              <p className="text-xs text-gray-600">Thu, Dec 19 • 6:30 PM</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2 rounded-md bg-[#E7FA99]/30 p-3">
                            <div className="h-2 w-2 flex-shrink-0 rounded-full bg-[#E7FA99] mt-1.5"></div>
                            <div className="flex-1 text-sm">
                              <p className="font-medium text-charcoal">Holiday party - Lily</p>
                              <p className="text-xs text-gray-600">Fri, Dec 20 • 2:00 PM</p>
                              <p className="text-xs font-medium text-[#F54933] mt-1">⚠️ Needs Christmas jumper</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Next 2 Weeks */}
                      <div className="mt-6">
                        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Next 2 Weeks
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2 rounded-md bg-[#F54933]/10 p-3">
                            <div className="h-2 w-2 flex-shrink-0 rounded-full bg-[#F54933] mt-1.5"></div>
                            <div className="flex-1 text-sm">
                              <p className="font-medium text-charcoal">Basketball Game - Emma</p>
                              <p className="text-xs text-gray-600">Mon, Dec 23 • 5:00 PM</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2 rounded-md bg-[#6477D5]/10 p-3">
                            <div className="h-2 w-2 flex-shrink-0 rounded-full bg-[#6477D5] mt-1.5"></div>
                            <div className="flex-1 text-sm">
                              <p className="font-medium text-charcoal">Art Class - Jack</p>
                              <p className="text-xs text-gray-600">Wed, Dec 25 • 10:00 AM</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="relative py-12 md:py-16">
          <div className="container relative z-10 mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-serif text-3xl font-semibold text-balance text-charcoal md:text-4xl">
                Because you don't need another app for your kids, you need infrastructure.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-600 text-pretty">
                We're building an AI agent that will pull relevant info from all your kids' apps and emails into your
                existing calendar and send Sunday Reports with the next few weeks of events so you'll never forget to
                buy a costume for the school play ever again. No new apps. No new calendars. This is what reducing the
                mental load actually looks like.
              </p>
              <p className="mt-4 text-lg font-semibold leading-relaxed text-gray-900 text-pretty">
                Join the waitlist to be notified when we launch.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-16 md:py-20">
          <div className="container relative z-10 mx-auto px-4">
            <div className="space-y-24">
              {/* Feature 1: AI Agent Automation - Text Left */}
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
                <div className="flex flex-col justify-center">
                  <h3 className="font-serif text-3xl font-semibold text-charcoal md:text-4xl">
                    Our AI Agent Automates Scheduling
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-gray-600 text-pretty">
                    Our AI agent automatically extracts key information from school newsletters, team emails, group
                    chats, and announcements - no manual work required. Just connect your accounts and calendar.
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-full max-w-md space-y-4">
                    {/* Email to Calendar Visualization */}
                    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                      <div className="mb-2 flex items-center gap-2">
                        <Mail className="h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">From: coach@soccerclub.com</span>
                      </div>
                      <p className="text-sm text-gray-600">Practice this Wednesday at 4pm. Don't forget cleats!</p>
                    </div>
                    <div className="flex justify-center">
                      <div className="text-[#6477D5]">
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="rounded-lg border-2 border-[#6477D5] bg-[#6477D5]/5 p-4 shadow-sm">
                      <div className="mb-2 flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-[#6477D5]" />
                        <span className="font-medium text-charcoal">Added to Calendar</span>
                      </div>
                      <p className="text-sm text-gray-700">Soccer Practice - Wednesday, 4:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 2: Weekly Sunday Reports - Text Right */}
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
                <div className="flex items-center justify-center lg:order-0">
                  <div className="w-full max-w-md rounded-lg border border-gray-300 bg-white shadow-lg">
                    <div className="border-b border-gray-300 bg-[#FFFEFB] px-4 py-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6477D5] text-sm font-semibold text-white">
                            P
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Parentis</p>
                            <p className="text-xs text-gray-500">to me</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400">Sun 8:00 AM</span>
                      </div>
                    </div>

                    {/* Email body */}
                    <div className="p-6">
                      <h3 className="font-serif text-xl font-semibold text-charcoal">Your Sunday Report</h3>
                      <p className="mt-1 text-xs text-gray-600">Here's what's coming up</p>

                      {/* This Week */}
                      <div className="mt-4">
                        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">This Week</h4>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2 rounded-md bg-[#F54933]/10 p-2">
                            <div className="h-2 w-2 flex-shrink-0 rounded-full bg-[#F54933] mt-1"></div>
                            <div className="flex-1 text-xs">
                              <p className="font-medium text-charcoal">Soccer Practice - Emma</p>
                              <p className="text-xs text-gray-600">Wed, Dec 18 • 4:00 PM</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2 rounded-md bg-[#6477D5]/10 p-2">
                            <div className="h-2 w-2 flex-shrink-0 rounded-full bg-[#6477D5] mt-1"></div>
                            <div className="flex-1 text-xs">
                              <p className="font-medium text-charcoal">Piano Recital - Jack</p>
                              <p className="text-xs text-gray-600">Thu, Dec 19 • 6:30 PM</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2 rounded-md bg-[#E7FA99]/30 p-2">
                            <div className="h-2 w-2 flex-shrink-0 rounded-full bg-[#E7FA99] mt-1"></div>
                            <div className="flex-1 text-xs">
                              <p className="font-medium text-charcoal">Holiday party - Lily</p>
                              <p className="text-xs text-gray-600">Fri, Dec 20 • 2:00 PM</p>
                              <p className="text-xs font-medium text-[#F54933] mt-1">⚠️ Needs Christmas jumper</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-300 bg-[#FFFEFB] px-4 py-2 text-center">
                      <p className="text-xs text-gray-500">Powered by Parentis</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center lg:order-1">
                  <h3 className="font-serif text-3xl font-semibold text-charcoal md:text-4xl">Weekly Sunday Reports</h3>
                  <p className="mt-4 text-lg leading-relaxed text-gray-600 text-pretty">
                    Every Sunday morning, receive a comprehensive report with the next 3 weeks of events, action items,
                    and important deadlines. Because you don't just need to know the concert is on Thursday, you need to
                    know two weeks before that you have to get their costume ready!
                  </p>
                </div>
              </div>

              {/* Feature 3: Auto Multi-Kid Management - Text Left */}
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
                <div className="flex flex-col justify-center">
                  <h3 className="font-serif text-3xl font-semibold text-charcoal md:text-4xl">
                    Auto Multi-Kid Management
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-gray-600 text-pretty">
                    Our AI automatically color-codes each child's events, making it easy to see who has what at a
                    glance.
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-full max-w-md space-y-3">
                    <div className="flex items-center gap-3 rounded-lg border-2 border-[#F54933] bg-[#F54933]/5 p-4">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-[#F54933]"></div>
                      <div>
                        <p className="font-semibold text-charcoal">Emma</p>
                        <p className="text-sm text-gray-600">Soccer, Piano</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg border-2 border-[#6477D5] bg-[#6477D5]/5 p-4">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-[#6477D5]"></div>
                      <div>
                        <p className="font-semibold text-charcoal">Jack</p>
                        <p className="text-sm text-gray-600">Basketball, Science Club</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg border-2 border-[#FA99E4] bg-[#FA99E4]/10 p-4">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-[#FA99E4]"></div>
                      <div>
                        <p className="font-semibold text-charcoal">Lily</p>
                        <p className="text-sm text-gray-600">Dance, Art Class</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 4: Easy Screenshot Upload - Text Right */}
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
                <div className="flex items-center justify-center lg:order-0">
                  <div className="w-full max-w-md space-y-4">
                    <div className="rounded-lg border-2 border-dashed border-gray-300 bg-white p-8 text-center">
                      <Button size="lg" className="bg-[#6477D5] text-white hover:bg-[#5366C4]">
                        Upload Screenshot
                      </Button>
                    </div>
                    <div className="flex justify-center">
                      <div className="text-[#6CAD76]">
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="rounded-lg border-2 border-[#6CAD76] bg-[#6CAD76]/10 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-[#6CAD76]" />
                        <span className="font-medium text-charcoal">Extracted & Added</span>
                      </div>
                      <p className="text-sm text-gray-700">3 new events added to calendar</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center lg:order-1">
                  <h3 className="font-serif text-3xl font-semibold text-charcoal md:text-4xl">
                    Easy Screenshot Upload
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-gray-600 text-pretty">
                    If something can't be automated, simply send us a screenshot and we'll handle the rest.
                  </p>
                  <p className="mt-3 text-lg leading-relaxed text-gray-600 text-pretty">
                    Birthday invite with complicated details? Team schedule posted on social media? Just snap a pic and
                    send. Our AI will extract the details and add them to your calendar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="relative py-16 md:py-20">
          <div className="container relative z-10 mx-auto px-4">
            <div className="relative mx-auto max-w-3xl">
              {/* Colorful shape cluster background */}
              <div className="relative h-80 overflow-hidden rounded-3xl">
                {/* Shapes */}
                <div className="absolute inset-0">
                  <div className="absolute left-[5%] top-[10%] h-32 w-32 rounded-full bg-[#6477D5] opacity-80"></div>
                  <div className="absolute right-[10%] top-[5%] h-40 w-40 rotate-45 rounded-3xl bg-[#E7FA99] opacity-80"></div>
                  <div className="absolute left-[15%] bottom-[15%] h-36 w-36 rotate-12 rounded-2xl bg-[#99FADB] opacity-80"></div>
                  <div className="absolute right-[15%] bottom-[10%] h-32 w-32 rounded-full bg-[#F54933] opacity-80"></div>
                  <div className="absolute left-[40%] top-[20%] h-28 w-28 rotate-45 rounded-3xl bg-[#FA99E4] opacity-80"></div>
                  <div className="absolute right-[35%] bottom-[20%] h-24 w-24 rounded-full bg-[#5ECAEB] opacity-80"></div>
                  <div className="absolute left-[25%] top-[50%] h-20 w-20 rotate-12 rounded-2xl bg-[#6477D5] opacity-60"></div>
                  <div className="absolute right-[25%] top-[40%] h-24 w-24 rounded-full bg-[#E7FA99] opacity-70"></div>
                </div>

                {/* Text overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
                  <h2 className="font-serif text-4xl font-semibold text-balance text-black md:text-5xl">
                    Ready to escape the chaos?
                  </h2>
                  <div className="mt-6">
                    <Button size="lg" className="bg-black text-white hover:bg-gray-800">
                      Join the waitlist
                    </Button>
                  </div>
                  <p className="mt-3 text-lg text-gray-700">Join 100+ parents on the waitlist</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-t border-[#FFFEFB] bg-transparent py-16 md:py-20">
          <div className="container relative z-10 mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-serif text-4xl font-bold text-charcoal text-center mb-12 md:text-5xl">FAQs</h2>

              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1" className="border-0">
                  <div className="rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm transition-shadow hover:shadow-md">
                    <AccordionTrigger className="py-0 hover:no-underline">
                      <div className="flex items-center gap-4">
                        <Plus className="h-5 w-5 text-[#F54933] flex-shrink-0" />
                        <span className="text-lg font-semibold text-charcoal">What exactly is Parentis?</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 pl-9">
                      <p className="text-gray-600 leading-relaxed">
                        Parentis is an AI-powered infrastructure that automatically extracts information from all your
                        kids' apps, emails, and newsletters, then syncs everything to your existing calendar. You don't
                        need another app - Parentis works behind the scenes to reduce your mental load.
                      </p>
                    </AccordionContent>
                  </div>
                </AccordionItem>

                <AccordionItem value="item-2" className="border-0">
                  <div className="rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm transition-shadow hover:shadow-md">
                    <AccordionTrigger className="py-0 hover:no-underline">
                      <div className="flex items-center gap-4">
                        <Plus className="h-5 w-5 text-[#F54933] flex-shrink-0" />
                        <span className="text-lg font-semibold text-charcoal">When will Parentis be available?</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 pl-9">
                      <p className="text-gray-600 leading-relaxed">
                        We're currently in development and planning to launch in early 2025. Join our waitlist to be
                        among the first to get access and receive exclusive early-bird pricing.
                      </p>
                    </AccordionContent>
                  </div>
                </AccordionItem>

                <AccordionItem value="item-3" className="border-0">
                  <div className="rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm transition-shadow hover:shadow-md">
                    <AccordionTrigger className="py-0 hover:no-underline">
                      <div className="flex items-center gap-4">
                        <Plus className="h-5 w-5 text-[#F54933] flex-shrink-0" />
                        <span className="text-lg font-semibold text-charcoal">How does the AI automation work?</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 pl-9">
                      <p className="text-gray-600 leading-relaxed">
                        Our AI agent connects to your email and app accounts (with your permission) and intelligently
                        reads through school newsletters, coach emails, team announcements, and more. It extracts key
                        dates, deadlines, and action items, then automatically adds them to your existing calendar with
                        proper categorization and color-coding per child.
                      </p>
                    </AccordionContent>
                  </div>
                </AccordionItem>

                <AccordionItem value="item-4" className="border-0">
                  <div className="rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm transition-shadow hover:shadow-md">
                    <AccordionTrigger className="py-0 hover:no-underline">
                      <div className="flex items-center gap-4">
                        <Plus className="h-5 w-5 text-[#F54933] flex-shrink-0" />
                        <span className="text-lg font-semibold text-charcoal">Is my family's data secure?</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 pl-9">
                      <p className="text-gray-600 leading-relaxed">
                        Absolutely. We take security seriously and use bank-level encryption to protect your data. We
                        only access the information necessary to extract calendar events and never share your data with
                        third parties. Your privacy and security are our top priorities.
                      </p>
                    </AccordionContent>
                  </div>
                </AccordionItem>

                <AccordionItem value="item-5" className="border-0">
                  <div className="rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm transition-shadow hover:shadow-md">
                    <AccordionTrigger className="py-0 hover:no-underline">
                      <div className="flex items-center gap-4">
                        <Plus className="h-5 w-5 text-[#F54933] flex-shrink-0" />
                        <span className="text-lg font-semibold text-charcoal">How much will Parentis cost?</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 pl-9">
                      <p className="text-gray-600 leading-relaxed">
                        We're finalizing our pricing structure, but we're committed to keeping it affordable for busy
                        families. Early waitlist members will receive special launch pricing. Join the waitlist to be
                        notified when pricing details are announced.
                      </p>
                    </AccordionContent>
                  </div>
                </AccordionItem>

                <AccordionItem value="item-6" className="border-0">
                  <div className="rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm transition-shadow hover:shadow-md">
                    <AccordionTrigger className="py-0 hover:no-underline">
                      <div className="flex items-center gap-4">
                        <Plus className="h-5 w-5 text-[#F54933] flex-shrink-0" />
                        <span className="text-lg font-semibold text-charcoal">
                          Can I sync Parentis with my existing calendar?
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 pl-9">
                      <p className="text-gray-600 leading-relaxed">
                        Yes! That's the whole point. Parentis syncs directly with Google Calendar, Apple Calendar,
                        Outlook, and other popular calendar platforms. You don't need to learn a new system - we work
                        with the tools you already use.
                      </p>
                    </AccordionContent>
                  </div>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative border-t border-[#FFFEFB] py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="flex items-center gap-3">
                {/* Removed logo component */}
                <span className="font-serif text-lg font-semibold text-charcoal">Parentis</span>
              </div>
              <p className="text-sm text-gray-500">© 2025 Parentis. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
