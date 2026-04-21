import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ContactForm from '@/components/ContactForm.jsx';
import { SITE_NAME, CONTACT } from '@/config/site';

function ContactPage() {
  const contactInfo = [
    { icon: Mail,  label: 'Email',          value: CONTACT.email,   link: `mailto:${CONTACT.email}` },
     //{ icon: Phone, label: 'Phone',          value: CONTACT.phone,   link: `tel:${CONTACT.phoneTel}` },
    { icon: MapPin,label: 'Office',         value: CONTACT.address },
    //{ icon: Clock, label: 'Business hours', value: CONTACT.hours },
  ];

  return (
    <>
      <Helmet>
        <title>Contact - {SITE_NAME}</title>
        <meta name="description" content={`Get in touch with ${SITE_NAME}. Schedule a consultation to discuss how our data analytics solutions can help your business.`} />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">

          <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Let's start a conversation</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Tell us about your business challenges and we'll show you how {SITE_NAME}'s data and AI solutions can help!
                </p>
              </motion.div>
            </div>
          </section>

          <section className="py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                  <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
                    <h2 className="text-2xl font-semibold mb-6 text-card-foreground">Send us a message</h2>
                    <ContactForm />
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-semibold mb-4">Get in touch</h2>
                      <p className="text-muted-foreground leading-relaxed">
                        Whether you're looking to optimize your existing analytics infrastructure or starting from scratch, our team is ready to help.
                      </p>
                    </div>
                    <div className="space-y-6">
                      {contactInfo.map((item, index) => (
                        <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <item.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-muted-foreground mb-1">{item.label}</p>
                            {item.link ? (
                              <a href={item.link} className="text-foreground hover:text-primary transition-colors">{item.value}</a>
                            ) : (
                              <p className="text-foreground">{item.value}</p>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
          {/*
          <section className="py-20 bg-muted/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-5xl mx-auto">
                <div className="bg-card rounded-2xl p-12 border border-border text-center">
                  <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold mb-2">Visit our office</h3>
                  <p className="text-muted-foreground">{CONTACT.address}</p>
                </div>
              </motion.div>
            </div>
          </section>
*/}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default ContactPage;
