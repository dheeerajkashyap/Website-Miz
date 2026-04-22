import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { SITE_NAME, IMAGES } from '@/config/site';

function CaseStudyPage() {
  const [expandedId, setExpandedId] = useState(null);

  const caseStudies = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
      title: "E-commerce Growth Scaling",
      category: "D2C",
      quickRead: "Increased AOV by 45% and reduced CAC by 30% through inventory optimization and audience segmentation.",
      fullDescription: "This D2C brand was struggling with high customer acquisition costs and declining average order value. We implemented a sophisticated inventory prioritization system using MOI (Movement x Margin x Investment) metrics and rebuilt their media strategy with audience cohort analysis.",
      metrics: ["45% AOV increase", "30% CAC reduction", "₹2.3Cr revenue impact"]
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1460925895917-aeb19be489c7?w=400&h=300&fit=crop",
      title: "Analytics Infrastructure Build",
      category: "Operations",
      quickRead: "Built end-to-end BI dashboard and automated reporting reducing decision cycles from 2 weeks to real-time.",
      fullDescription: "The brand had scattered data sources and manual reporting. We centralized data into a unified BI layer with automated daily reporting, enabling real-time P&L tracking and unit economics visibility across all channels.",
      metrics: ["Real-time reporting", "2-week to daily cycle", "100% data visibility"]
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
      title: "Supply Chain Optimization",
      category: "Production",
      quickRead: "Reduced inventory holding costs by 35% and improved fill rates to 98% using demand forecasting.",
      fullDescription: "With 5000+ SKUs, demand forecasting was critical. We implemented a production priority system based on velocity, margin, and seasonal patterns, optimizing safety stock and reducing dead inventory while maintaining fill rates.",
      metrics: ["35% inventory reduction", "98% fill rate", "₹80L cost savings"]
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
      title: "Pricing & Discounting Strategy",
      category: "Strategy",
      quickRead: "Implemented elasticity-based dynamic pricing increasing margin by 12% without impacting conversion.",
      fullDescription: "Manual discounting was eroding margins. We built a pricing elasticity model to understand customer segments and price sensitivity, enabling smarter promotional strategies that protected margin while driving volume.",
      metrics: ["12% margin improvement", "Stable conversion", "₹1.2Cr incremental profit"]
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
      title: "Customer Cohort Analysis",
      category: "Analytics",
      quickRead: "Identified high-value segments and built retention playbooks improving repeat purchase by 28%.",
      fullDescription: "Using RFM segmentation and cohort-level return rates, we created targeted retention strategies for different customer tiers, with personalized email sequences and loyalty programs.",
      metrics: ["28% repeat purchase lift", "16% LTV increase", "50% email ROI improvement"]
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
      title: "Multi-channel Attribution",
      category: "Analytics",
      quickRead: "Built attribution model revealing true channel ROI, reallocating budget to high-performing channels.",
      fullDescription: "Facebook claimed 70% of conversions, but attribution revealed organic and email were driving 40% of incremental revenue. We rebalanced the media mix based on true contribution, improving overall ROAS by 35%.",
      metrics: ["35% ROAS improvement", "22% budget reallocation", "Accurate attribution"]
    }
  ];

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <>
      <Helmet>
        <title>Case Studies - {SITE_NAME}</title>
        <meta name="description" content="See real results from scaling D2C brands with data-driven strategies and analytics frameworks." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-20 pb-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0 z-0"
            >
              <img
                src={IMAGES.heroBg}
                alt="Case studies background"
                className="w-full h-full object-cover object-center"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/95 via-[#0f2847]/90 to-[#0d3d4f]/85"></div>
              <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#0a1628]/40"></div>
            </motion.div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="max-w-3xl"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                  Case Studies
                </h1>
                <p className="text-xl text-white/90 leading-relaxed mb-8 max-w-2xl drop-shadow-md">
                  Real results from scaling D2C brands—from boAt to Superkicks and beyond.
                </p>
              </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[5]"></div>
          </section>

          {/* Case Studies Grid Section */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {caseStudies.map((study, index) => (
                  <motion.div
                    key={study.id}
                    variants={itemVariants}
                    className="group"
                  >
                    <div
                      className="h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg"
                      onClick={() => toggleExpand(study.id)}
                    >
                      {/* Image */}
                      <div className="w-full h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                        <img
                          src={study.image}
                          alt={study.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        
                        {/* Category Badge */}
                        <div className="inline-block bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold px-3 py-1 rounded-md mb-3 uppercase tracking-wide">
                          {study.category}
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3 line-clamp-2">
                          {study.title}
                        </h3>

                        {/* Quick Read */}
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                          {study.quickRead}
                        </p>

                        {/* Expanded Section */}
                        {expandedId === study.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pt-4 border-t border-slate-200 dark:border-slate-700"
                          >
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                              {study.fullDescription}
                            </p>

                            {/* Metrics */}
                            <div className="space-y-2 mb-4">
                              {study.metrics.map((metric, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white">
                                  <div className="w-1 h-1 rounded-full bg-teal-500"></div>
                                  {metric}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {/* Expand Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand(study.id);
                          }}
                          className="flex items-center gap-2 text-sm font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
                        >
                          {expandedId === study.id ? 'Show less' : 'Learn more'}
                          <ArrowRight 
                            size={16} 
                            className={`transition-transform duration-300 ${expandedId === study.id ? 'rotate-90' : ''}`}
                          />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto text-center"
              >
                <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                  Ready to transform your data strategy?
                </h2>
                <p className="text-lg text-primary-foreground/90 mb-8 leading-relaxed">
                  Join hundreds of businesses that rely on {SITE_NAME} for data-driven decision making
                </p>
                <Button asChild size="lg" variant="secondary" className="text-base">
                  <Link to="/contact">
                    Schedule a consultation
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default CaseStudyPage;
