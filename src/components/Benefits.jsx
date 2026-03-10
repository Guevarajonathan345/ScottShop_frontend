import { motion } from "framer-motion";

const benefits = [
  {
    icon: "🚚",
    title: "Envíos rápidos",
    description: "Entrega segura en todo el país"
  },
  {
    icon: "🔒",
    title: "Pago seguro",
    description: "Protección total en cada compra"
  },
  {
    icon: "⭐",
    title: "Garantía oficial",
    description: "Productos originales con garantía"
  }
];

const Benefits = () => {
  return (
    <section className="py-20 bg-base-200">

      <div className="max-w-6xl mx-auto px-4">

        <div className="grid md:grid-cols-3 gap-8">

          {benefits.map((benefit, index) => (

            <motion.div
              key={index}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="card bg-base-100 shadow-md p-6 text-center"
            >

              <div className="text-4xl mb-3">
                {benefit.icon}
              </div>

              <h3 className="text-lg font-semibold">
                {benefit.title}
              </h3>

              <p className="text-base-content/60 mt-1">
                {benefit.description}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Benefits;