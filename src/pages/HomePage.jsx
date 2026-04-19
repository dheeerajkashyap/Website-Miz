
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Zap, Target, Shield, ArrowRight, DatabaseZap, MonitorCog, handshake } from 'lucide-react';
import { SITE_NAME, IMAGES } from '@/config/site';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import BenefitCard from '@/components/BenefitCard.jsx';

function HomePage() {
  const benefits = [
    {
      icon: Zap,
      title: 'Make faster decisions',
      description: 'Access real-time insights and analytics that help you respond to market changes quickly and confidently.',
      metric: '2.4x'
    },
    {
      icon: Target,
      title: 'Improve accuracy',
      description: 'Reduce guesswork with data-driven intelligence that uncovers patterns and trends hidden in your operations.',
      metric: '47%'
    },
    {
      icon: Shield,
      title: 'Reduce risk exposure',
      description: 'Identify potential issues before they become problems with predictive analytics and scenario modeling.',
      metric: '83%'
    }
  ];


  const areas = [
    {
      icon: DatabaseZap,
      title: 'Scattered Data Sources',
      description: 'Data across Shopify, Meta/Google ads, marketplaces, and Inventory ERPs creates more noise than clarity.',
      metric: '2.4x'
    },
    {
      icon: MonitorCog,
      title: 'No Data Frameworks',
      description: 'Numbers exist, but there’s no structure with business context to translate them into concrete actions.',
      metric: '47%'
    },
    {
      icon: handshake,
      title: 'Disconnected Teams',
      description: 'Marketing, operations, and finance work in silos—leading to misaligned decisions.',
      metric: '83%'
    }
  ];


const phrases = [
  "Revenue Scaling",
  "Operational Efficiency",
  "Cost Optimization"
];

const [displayText, setDisplayText] = React.useState("");
const [phraseIndex, setPhraseIndex] = React.useState(0);
const [isDeleting, setIsDeleting] = React.useState(false);

React.useEffect(() => {
  const currentPhrase = phrases[phraseIndex];
  let typingSpeed = isDeleting ? 40 : 80;

  const timeout = setTimeout(() => {
    setDisplayText((prev) =>
      isDeleting
        ? currentPhrase.substring(0, prev.length - 1)
        : currentPhrase.substring(0, prev.length + 1)
    );

    if (!isDeleting && displayText === currentPhrase) {
      setTimeout(() => setIsDeleting(true), 1200);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }
  }, typingSpeed);

  return () => clearTimeout(timeout);
}, [displayText, isDeleting, phraseIndex]);

  
  
  return (
    <>
      <Helmet>
        <title>MizzenIQ - Data-driven insights for better business decisions</title>
        <meta name="description" content="Transform your data into actionable insights. MizzenIQ helps businesses make faster, more accurate decisions with advanced analytics and strategic intelligence." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative min-h-[90vh] flex items-center overflow-hidden">
            {/* Background Image with Fade-in Animation */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0 z-0"
            >
              <img
                src={IMAGES.heroBg}
                alt={IMAGES.heroBgAlt}
                className="w-full h-full object-cover object-center"
                loading="eager"
              />
              {/* Gradient Overlay - Deep blue to teal matching brand colors */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/95 via-[#0f2847]/90 to-[#0d3d4f]/85"></div>
              {/* Additional subtle radial gradient for depth */}
              <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#0a1628]/40"></div>
            </motion.div>

            {/* Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="max-w-3xl"
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 drop-shadow-lg">
                  Build Decision Intelligence
                </h1>
                <p className="text-xl text-white/95 leading-relaxed mb-8 max-w-2xl drop-shadow-md">
                Turn your data into structured systems that drive faster, smarter decisions at scale.
                </p>
<div className="mb-8">
  <p className="text-lg text-white/80 mb-2">
    For Businesses Seeking:
  </p>
  <p className="text-2xl md:text-3xl font-semibold h-[40px] bg-gradient-to-r from-teal-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
    {displayText}
    <span className="animate-pulse">|</span>
  </p>
</div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="text-base shadow-xl hover:shadow-2xl transition-all duration-300">
                    <Link to="/contact">
                      Get First Solution | Free
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button 
                    asChild 
                    size="lg" 
                    variant="outline" 
                    className="text-base bg-white/15 border-white/30 text-white hover:bg-white/25 hover:border-white/40 backdrop-blur-sm shadow-lg transition-all duration-300"
                  >
                    <Link to="/CaseStudies">
                      Case Studies
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Decorative gradient accent at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[5]"></div>
          </section>

          {/* Benefits Section */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
               <h1 className="text-3xl md:text-4xl font-semibold mb-4">
  Broader Vision
</h1>

<h2 className="text-1xl md:text-2xl font-semibold mb-6">
  Most Businesses Don’t Lack Data-They Lack Direction.
</h2>

<p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
  Despite having access to more data than ever, most businesses still struggle to turn it into clear, actionable decisions.
</p>
                <br></br>
<h2 className="text-2xl md:text-3xl font-semibold mb-6">
  What Stops?
</h2>


              </motion.div>



              
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {areas.slice(0, 2).map((area, index) => (
                  <BenefitCard
                    key={index}
                    icon={area.icon}
                    title={area.title}
                    description={area.description}
                    
                    index={index}
                  />
                ))}
              </div>
              <div className="max-w-3xl mx-auto">
                <BenefitCard
                  icon={areas[2].icon}
                  title={areas[2].title}
                  description={areas[2].description}
                  
                  index={2}
                />
              </div>
          
              //Important


<p className="text-lg mt-10 text-center">
  So even when you grow, you don’t know <span className="font-semibold">why</span>—or what to do next.
</p>

              {/* 2+1 Layout - First two side by side, third full width below */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {benefits.slice(0, 2).map((benefit, index) => (
                  <BenefitCard
                    key={index}
                    icon={benefit.icon}
                    title={benefit.title}
                    description={benefit.description}
                    metric={benefit.metric}
                    index={index}
                  />
                ))}
              </div>
              <div className="max-w-3xl mx-auto">
                <BenefitCard
                  icon={benefits[2].icon}
                  title={benefits[2].title}
                  description={benefits[2].description}
                  metric={benefits[2].metric}
                  index={2}
                />
              </div>
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
                  Join hundreds of businesses that rely on MizzenIQ for data-driven decision making
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

export default HomePage;
