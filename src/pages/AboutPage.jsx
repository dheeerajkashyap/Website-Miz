
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Target, Eye, Award, Users } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Precision',
      description: 'We believe accuracy matters. Every insight we deliver is backed by rigorous analysis.'
    },
    {
      icon: Eye,
      title: 'Clarity',
      description: 'Complex data made simple. We translate numbers into stories that drive action.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Quality is non-negotiable. We hold ourselves to the highest standards in every engagement.'
    },
    {
      icon: Users,
      title: 'Partnership',
      description: 'Your success is our success. We work alongside you as trusted advisors, not vendors.'
    }
  ];

  /*const teamMembers = [
    {
      name: 'ABC',
      role: 'Chief Data Officer',
      expertise: 'Machine learning, predictive analytics'
    },
    {
      name: 'ABC',
      role: 'VP of Strategy',
      expertise: 'Business intelligence, process optimization'
    },
    {
      name: 'ABC',
      role: 'Lead Engineer',
      expertise: 'Data infrastructure, cloud architecture'
    },
    {
      name: 'ABC',
      role: 'Analytics Director',
      expertise: 'Statistical modeling, visualization'
    }
  ]; */

  return (
    <>
      <Helmet>
        <title>About - MizzenIQ</title>
        <meta name="description" content="Learn about MizzenIQ's mission to help businesses make better decisions through data. Meet our team of analytics experts and discover our approach to data-driven strategy." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto text-center"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Building the future of data-driven business
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  MizzenIQ was founded on a simple belief: every organization deserves access to insights that drive meaningful outcomes
                </p>
              </motion.div>
            </div>
          </section>

          {/* Mission Section */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-sm font-semibold uppercase tracking-wider text-accent mb-4 block">Our mission</span>
                  <h2 className="text-3xl font-semibold mb-4">
                    Making data accessible and actionable
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                    We help organizations cut through complexity and extract clear answers from their data. Our platform transforms raw information into strategic intelligence that informs better decisions.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Founded in 2019, MizzenIQ has grown from a small consulting practice to a full-service analytics partner serving clients across industries. We combine technical expertise with business acumen to deliver solutions that actually move the needle.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-muted/50 rounded-2xl p-8"
                >
                  <span className="text-sm font-semibold uppercase tracking-wider text-accent mb-4 block">Our vision</span>
                  <h3 className="text-2xl font-semibold mb-4">
                    A world where data drives every decision
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    We envision a future where organizations of all sizes can harness the power of their data without requiring specialized technical teams. By democratizing access to advanced analytics, we enable smarter strategies and better outcomes across the board.
                  </p>
                  <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border">
                    <div>
                      <div className="text-3xl font-bold text-primary mb-1">320+</div>
                      <div className="text-sm text-muted-foreground">Clients served</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-1">2.8M</div>
                      <div className="text-sm text-muted-foreground">Data points analyzed daily</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-20 bg-muted/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                  Our values
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Principles that guide every decision and client interaction
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                  Meet our leadership team
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Experienced professionals dedicated to your success
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 mx-auto mb-4"></div>
                    <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                    <p className="text-sm text-accent font-medium mb-2">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.expertise}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default AboutPage;
