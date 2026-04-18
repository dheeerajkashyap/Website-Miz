
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Database, Lightbulb, Gauge, BarChart } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ServiceCard from '@/components/ServiceCard.jsx';

function ServicesPage() {
  const services = [
    {
      icon: Database,
      title: 'Data Analytics',
      description: 'Transform raw data into clear, actionable insights. We analyze patterns, trends, and anomalies to help you understand what your data is telling you.',
      features: [
        'Custom dashboard development',
        'Real-time data processing',
        'Predictive modeling and forecasting',
        'Data quality assessment'
      ]
    },
    {
      icon: Lightbulb,
      title: 'Strategic Consulting',
      description: 'Partner with our experts to build a data strategy that aligns with your business goals. We help you identify opportunities and optimize operations.',
      features: [
        'Business intelligence roadmapping',
        'Process optimization analysis',
        'Technology stack evaluation',
        'Change management support'
      ]
    },
    {
      icon: Gauge,
      title: 'Decision Support Systems',
      description: 'Equip your team with tools that surface the right information at the right time. We build systems that streamline decision-making workflows.',
      features: [
        'Executive reporting frameworks',
        'Automated alert systems',
        'Scenario analysis tools',
        'KPI tracking and monitoring'
      ]
    },
    {
      icon: BarChart,
      title: 'Business Intelligence',
      description: 'Gain comprehensive visibility into your operations. Our BI solutions connect disparate data sources to give you a unified view of performance.',
      features: [
        'Data warehouse design',
        'ETL pipeline development',
        'Self-service analytics platforms',
        'Cross-functional reporting'
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Services - MizzenIQ</title>
        <meta name="description" content="Explore our data analytics services: from strategic consulting to custom dashboard development. MizzenIQ delivers solutions tailored to your business needs." />
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
                  Services designed for data-driven success
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  From analytics to implementation, we provide end-to-end solutions that turn your data into competitive advantage
                </p>
              </motion.div>
            </div>
          </section>

          {/* Services Grid */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {services.map((service, index) => (
                  <ServiceCard
                    key={index}
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                    features={service.features}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="py-20 bg-muted/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                  Our approach
                </h2>
                <p className="text-lg text-muted-foreground">
                  A proven methodology that ensures measurable results
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                {[
                  { step: '01', title: 'Discovery', description: 'Understand your business objectives and data landscape' },
                  { step: '02', title: 'Analysis', description: 'Identify opportunities and develop strategic recommendations' },
                  { step: '03', title: 'Implementation', description: 'Build and deploy solutions tailored to your needs' },
                  { step: '04', title: 'Optimization', description: 'Monitor performance and refine for continuous improvement' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-6xl font-bold text-primary/20 mb-4">{item.step}</div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
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

export default ServicesPage;
