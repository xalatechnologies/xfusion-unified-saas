import { Card, CardContent } from "@/components/shared/Card";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      title: t('landing.features.workOrders.title'),
      description: t('landing.features.workOrders.description'),
      icon: "🔧",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      title: t('landing.features.inventory.title'),
      description: t('landing.features.inventory.description'),
      icon: "📦",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      title: t('landing.features.maintenance.title'),
      description: t('landing.features.maintenance.description'),
      icon: "📅",
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      title: t('landing.features.procurement.title'),
      description: t('landing.features.procurement.description'),
      icon: "💰",
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: t('landing.features.procedures.title'),
      description: t('landing.features.procedures.description'),
      icon: "📋",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      title: t('landing.features.analytics.title'),
      description: t('landing.features.analytics.description'),
      icon: "📊",
      gradient: "from-violet-500 to-purple-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const cardHoverVariants = {
    rest: { scale: 1, y: 0 },
    hover: { 
      scale: 1.05, 
      y: -8,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <section id="features" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              {t('landing.features.title')}
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {t('landing.features.subtitle')}
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {t('landing.features.description')}
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              initial="rest"
            >
              <motion.div variants={cardHoverVariants}>
                <Card className="group border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-white h-full">
                  <CardContent className="p-8 text-center relative overflow-hidden">
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                      whileHover={{ opacity: 0.1 }}
                    />
                    <motion.div 
                      className={`relative w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-2xl shadow-lg`}
                      whileHover={{ 
                        rotate: [0, -10, 10, 0],
                        scale: 1.1
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
