
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import SolutionCard from '@/components/SolutionCard.jsx';

function SolutionsPage() {
  const solutions = [
    {
      metric: '2.4x',
      unit: 'faster',
      title: 'Decision velocity',
      description: 'Reduce time from data to decision with real-time dashboards and automated reporting that surface critical insights instantly.',
      outcome: 'Average response time reduced from 3 days to 1.3 days'
    },
    {
      metric: '47%',
      unit: 'increase',
      title: 'Forecast accuracy',
      description: 'Improve prediction reliability with machine learning models that adapt to your business patterns and market conditions.',
      outcome: 'Predictive error rates decreased by nearly half'
    },
    {
      metric: '83%',
      unit: 'reduction',
      title: 'Risk exposure',
      description: 'Identify and mitigate threats earlier with anomaly detection and scenario modeling that flags issues before they escalate.',
      outcome: 'Critical incidents caught in preliminary stages'
    },
    {
      metric: '5.2x',
      unit: 'ROI',
      title: 'Return on investment',
      description: 'Deliver measurable business value through optimized operations, reduced waste, and strategic resource allocation.',
      outcome: 'Typical payback period of 8 months'
    },
    {
      metric: '92%',
      unit: 'visibility',
      title: 'Data coverage',
      description: 'Connect siloed systems to create a unified view across your entire organization, from operations to finance.',
      outcome: 'Cross-functional reporting now standard practice'
    },
    {
      metric: '68%',
      unit: 'faster',
      title: 'Report generation',
      description: 'Automate manual reporting workflows so your team spends less time compiling data and more time acting on insights.',
      outcome: 'Monthly close reduced from 12 days to 4 days'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Solutions - MizzenIQ</title>
        <meta name="description" content="Discover how MizzenIQ solutions deliver measurable outcomes: faster decisions, improved accuracy, and reduced risk exposure through data-driven intelligence." />
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
                  Solutions backed by measurable results
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  See how our platform drives performance improvements across key business metrics
                </p>
              </motion.div>
            </div>
          </section>

          {/* Solutions Grid */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {solutions.map((solution, index) => (
                  <SolutionCard
                    key={index}
                    metric={solution.metric}
                    unit={solution.unit}
                    title={solution.title}
                    description={solution.description}
                    outcome={solution.outcome}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Case Study Highlight */}
          <section className="py-20 bg-muted/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="bg-card rounded-2xl p-8 md:p-12 border border-border shadow-lg">
                  <div className="mb-6">
                    <span className="text-sm font-semibold uppercase tracking-wider text-accent">Case study</span>
                    <h2 className="text-3xl font-semibold mt-2 mb-4">
                      Global logistics firm cuts decision time in half
                    </h2>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    A Fortune 500 logistics company partnered with MizzenIQ to modernize their operations analytics. Within six months, they reduced average decision-making time from 72 hours to 31 hours while improving forecast accuracy by 42%.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-border">
                    <div>
                      <div className="text-3xl font-bold text-primary mb-1">31hrs</div>
                      <div className="text-sm text-muted-foreground">Average decision time</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-1">42%</div>
                      <div className="text-sm text-muted-foreground">Forecast improvement</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-1">$2.1M</div>
                      <div className="text-sm text-muted-foreground">Annual savings</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Technology Stack */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                  Built on proven technology
                </h2>
                <p className="text-lg text-muted-foreground">
                  Our platform integrates with your existing infrastructure
                </p>
              </motion.div>

              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {['Cloud infrastructure', 'Machine learning', 'Real-time processing', 'Enterprise security'].map((tech, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="text-center"
                    >
                      <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <div className="w-8 h-8 rounded-lg bg-primary"></div>
                      </div>
                      <p className="text-sm font-medium">{tech}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default SolutionsPage;
