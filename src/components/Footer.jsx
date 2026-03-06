const Footer = () => {
  return (
    <footer className="bg-base-200 mt-20 p-10">

      <div className="grid md:grid-cols-3 gap-10">

        <div>
          <h2 className="text-xl font-bold">
            ScottShop
          </h2>

          <p className="text-gray-500 mt-2">
            Tu tienda de tecnología confiable.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">Links</h3>

          <ul className="space-y-1 mt-2">
            <li>Inicio</li>
            <li>Productos</li>
            <li>Contacto</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">Síguenos</h3>

          <div className="flex gap-3 mt-2">
            <span>📘</span>
            <span>📸</span>
            <span>🐦</span>
          </div>
        </div>

      </div>

      <div className="text-center mt-10 text-gray-500">
        © 2026 ScottShop
      </div>

    </footer>
  );
};

export default Footer;