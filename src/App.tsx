// App.jsx
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useAnimation } from "motion/react";
import { Icon } from "@iconify/react";
import "./App.css";

function App() {
  const controls = useAnimation();
  const containerRef = useRef(null);
  /*  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  }); */

  useEffect(() => {
    void controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    });
  }, [controls]);

  return (
    <div ref={containerRef} className="bg-gray-50 min-h-screen">
      <Navbar />
      <Hero />
      <WhyHopAlong />
      <HowItWorks />
      <CallToAction />
      <Footer />
      <TaxiAnimation />
    </div>
  );
}

function Navbar() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 bg-white shadow-md z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Icon icon="mdi:car-sports" className="text-yellow-400 text-3xl" />
          <span className="font-bold text-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-transparent bg-clip-text">
            HopAlong
          </span>
        </motion.div>

        <div className="hidden md:flex gap-6">
          {["About", "Features", "How It Works", "Community"].map((item, i) => (
            <motion.a
              key={i}
              href="#"
              className="text-gray-700 hover:text-yellow-400 transition-colors"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              {item}
            </motion.a>
          ))}
        </div>

        <motion.button
          className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-4 py-2 rounded-full font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          Download App
        </motion.button>
      </div>
    </motion.nav>
  );
}

function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div className="pt-24 pb-16 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-100 to-white opacity-60 z-0"></div>

      <motion.div
        className="container mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-8 items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring" }}
      >
        <motion.div style={{ y, opacity }}>
          <motion.span
            className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium mb-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Icon icon="mdi:school" className="inline mr-1" /> For IIIT Kottayam
            Students
          </motion.span>

          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="block">Your Campus</span>
            <span className="bg-gradient-to-r from-yellow-400 to-amber-500 text-transparent bg-clip-text">
              Ride Revolution
            </span>
          </motion.h1>

          <motion.p
            className="text-gray-600 mb-6 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            The Ultimate Ride-Sharing App for IIIT Kottayam Students. Transform
            your daily commute with affordable rides and lasting connections.
          </motion.p>

          <div className="flex flex-wrap gap-4">
            <motion.button
              className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Icon icon="mdi:download" /> Download Now
            </motion.button>
            <motion.button
              className="border-2 border-yellow-400 text-gray-700 px-6 py-3 rounded-full font-medium flex items-center gap-2"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(250, 204, 21, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Icon icon="mdi:account-group" /> Join Community
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="relative">
            <motion.div
              className="w-full h-80 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center"
              whileHover={{
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <Icon icon="mdi:car-connected" className="text-white text-9xl" />
            </motion.div>

            <motion.div
              className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <Icon
                icon="mdi:map-marker-path"
                className="text-yellow-400 text-5xl"
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating elements */}
      <motion.div
        className="hidden md:block absolute top-20 right-10 text-yellow-400 opacity-20"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Icon icon="mdi:car-sports" className="text-9xl" />
      </motion.div>

      <motion.div
        className="hidden md:block absolute bottom-10 left-10 text-amber-500 opacity-20"
        animate={{
          y: [0, 30, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Icon icon="mdi:map" className="text-8xl" />
      </motion.div>
    </div>
  );
}

function WhyHopAlong() {
  const features = [
    {
      icon: "mdi:account-group",
      title: "Vibrant Campus Community",
      description:
        "Join a network of IIIT Kottayam students who share more than just rides—they share experiences, friendships, and a commitment to a sustainable campus lifestyle.",
    },
    {
      icon: "mdi:brain",
      title: "Smart Matchmaking",
      description:
        "Our cutting-edge algorithm pairs you with the best ride options based on your schedule and location, making your journey seamless and stress-free.",
    },
    {
      icon: "mdi:cash-multiple",
      title: "Affordable Rides",
      description:
        "Cut costs without cutting corners. Enjoy competitive fares that make your commute not just convenient but budget-friendly.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h2
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Why{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-amber-500 text-transparent bg-clip-text">
              HopAlong
            </span>
            ?
          </motion.h2>
          <motion.p
            className="text-gray-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Experience the difference with our community-focused ride-sharing
            platform designed exclusively for IIIT Kottayam students.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mb-4 mx-auto"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#fbbf24",
                  color: "#ffffff",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Icon
                  icon={feature.icon}
                  className="text-yellow-400 text-2xl"
                />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: "mdi:account-plus",
      title: "Sign Up",
      description:
        "Create your profile with your IIIT Kottayam email and join our trusted community.",
    },
    {
      icon: "mdi:magnify",
      title: "Find Your Ride",
      description:
        "Input your travel details—from the railway station, airport, or bus stand to campus—and let our advanced algorithm do the matching.",
    },
    {
      icon: "mdi:share",
      title: "Share and Save",
      description:
        "Connect with your peers, share the ride, split the cost, and enjoy a friendly, safe journey to and from college.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h2
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            How It{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-amber-500 text-transparent bg-clip-text">
              Works
            </span>
          </motion.h2>
          <motion.p
            className="text-gray-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Getting started with HopAlong is simple, quick, and designed with
            your convenience in mind.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 transform -translate-y-1/2 z-0"></div>

          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow relative z-10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              whileHover={{
                y: -8,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mb-4 mx-auto text-white font-bold text-xl"
                whileHover={{
                  scale: 1.1,
                  rotate: 10,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="step-number">{i + 1}</span>
              </motion.div>
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <Icon icon={step.icon} className="text-yellow-400 text-3xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background decorative elements */}
      <motion.div
        className="absolute top-10 left-10 text-yellow-200 opacity-20"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Icon icon="mdi:car-clock" className="text-8xl" />
      </motion.div>

      <motion.div
        className="absolute bottom-10 right-10 text-amber-200 opacity-20"
        animate={{
          rotate: [0, -360],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Icon icon="mdi:map-marker-radius" className="text-9xl" />
      </motion.div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          whileHover={{ y: -5 }}
        >
          {/* Decorative elements */}
          <motion.div
            className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white opacity-10"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 10, 0],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          ></motion.div>
          <motion.div
            className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-white opacity-10"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -10, 0],
              y: [0, 10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          ></motion.div>

          <div className="md:flex items-center justify-between relative z-10">
            <div className="md:w-7/12 mb-6 md:mb-0">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-white mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Ready to Hop Along?
              </motion.h2>
              <motion.p
                className="text-yellow-50 text-lg"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Transform the way you travel—join HopAlong today and experience
                the freedom of smart, affordable, and community-driven
                commuting.
              </motion.p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                className="bg-white text-amber-500 px-6 py-3 rounded-full font-medium flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 17,
                  delay: 0.6,
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Icon icon="mdi:download" /> Download Now
              </motion.button>
              <motion.button
                className="border-2 border-white text-white px-6 py-3 rounded-full font-medium flex items-center justify-center gap-2"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 17,
                  delay: 0.7,
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Icon icon="mdi:account-group" /> Join Community
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Icon
                icon="mdi:car-sports"
                className="text-yellow-400 text-2xl"
              />
              <span className="font-bold text-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-transparent bg-clip-text">
                HopAlong
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Your Ride, Your Way, Every Day!
            </p>
            <div className="flex gap-4">
              {[
                "mdi:facebook",
                "mdi:twitter",
                "mdi:instagram",
                "mdi:linkedin",
              ].map((icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="text-gray-400 hover:text-yellow-400"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Icon icon={icon} className="text-xl" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {[
            {
              title: "Company",
              links: ["About Us", "Careers", "Blog", "Press"],
            },
            {
              title: "Resources",
              links: ["Help Center", "Safety", "Universities", "Developers"],
            },
            {
              title: "Legal",
              links: [
                "Terms of Service",
                "Privacy Policy",
                "Cookie Policy",
                "GDPR",
              ],
            },
          ].map((col, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * (i + 1) }}
            >
              <h3 className="font-semibold text-lg mb-4">{col.title}</h3>
              <ul className="space-y-2">
                {col.links.map((link, j) => (
                  <motion.li key={j}>
                    <motion.a
                      href="#"
                      className="text-gray-400 hover:text-yellow-400 transition-colors"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 10,
                      }}
                    >
                      {link}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2025 HopAlong. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-500 hover:text-yellow-400 text-sm">
              IIIT Kottayam
            </a>
            <a href="#" className="text-gray-500 hover:text-yellow-400 text-sm">
              Support
            </a>
            <a href="#" className="text-gray-500 hover:text-yellow-400 text-sm">
              Contact
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

function TaxiAnimation() {
  return (
    <div className="fixed bottom-10 right-10 z-50 w-16 h-16 taxi-container">
      <motion.div
        className="taxi-animation"
        animate={{
          x: [100, -100],
          rotate: [0, 0, 10, -10, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "mirror",
            duration: 8,
            ease: "easeInOut",
          },
          rotate: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 2,
            ease: "easeInOut",
          },
        }}
      >
        <Icon icon="mdi:taxi" className="text-yellow-400 text-4xl" />
      </motion.div>
    </div>
  );
}

export default App;
