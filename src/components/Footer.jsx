const Footer = () => {
  return (
    <footer className="bg-base-200 border-t border-base-300 mt-20">

      <div className="max-w-6xl mx-auto px-4 py-16">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Marca */}
          <div>
            <h2 className="text-xl font-bold">
              ScottShop
            </h2>

            <p className="text-base-content/60 mt-2">
              Tecnología moderna para tu día a día.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold mb-3">
              Tienda
            </h3>

            <ul className="space-y-2 text-base-content/70">
              <li className="hover:text-primary cursor-pointer">Inicio</li>
              <li className="hover:text-primary cursor-pointer">Productos</li>
              <li className="hover:text-primary cursor-pointer">Ofertas</li>
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h3 className="font-semibold mb-3">
              Soporte
            </h3>

            <ul className="space-y-2 text-base-content/70">
              <li className="hover:text-primary cursor-pointer">Contacto</li>
              <li className="hover:text-primary cursor-pointer">Preguntas</li>
              <li className="hover:text-primary cursor-pointer">Garantías</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-3">
              Síguenos
            </h3>

            <div className="flex gap-4 text-xl">

              <span className="cursor-pointer hover:scale-110 transition">
                📘
              </span>

              <span className="cursor-pointer hover:scale-110 transition">
                📸
              </span>

              <span className="cursor-pointer hover:scale-110 transition">
                🐦
              </span>

            </div>

          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-base-300 mt-12 pt-6 text-center text-sm text-base-content/60">
          © {new Date().getFullYear()} ScottShop — Todos los derechos reservados
        </div>

      </div>

    </footer>
  );
};

export default Footer;