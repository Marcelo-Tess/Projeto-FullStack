import { FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#26285C] text-white py-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
        
        {/* Coluna 1 - FoodBusiness */}
        <div>
          <h2 className="text-xl font-bold mb-3">FoodBusiness</h2>
          <p className="text-gray-300 leading-relaxed">
            Entregando refeições deliciosas na sua porta desde 2024.
            <br />
            Comida de qualidade, entrega rápida e serviço excelente.
          </p>
        </div>

        {/* Coluna 2 - Links Rápidos */}
        <div>
          <h2 className="text-xl font-bold mb-3">Links Rápidos</h2>
          <ul className="space-y-1 text-gray-300">
            <li><a href="/" className="hover:text-white">Página Inicial</a></li>
            <li><a href="/cardapio" className="hover:text-white">Cardápio</a></li>
            <li><a href="/delivery" className="hover:text-white">Delivery</a></li>
            <li><a href="/faq" className="hover:text-white">Perguntas Frequentes</a></li>
          </ul>
        </div>

        {/* Coluna 3 - Localização */}
        <div>
          <h2 className="text-xl font-bold mb-3">Localização</h2>
          <p className="text-gray-300">
            Av 13 de Maio, 2000<br />
            Bairro de Fátima<br />
            Fortaleza - Ceará
          </p>
        </div>

        {/* Coluna 4 - Contato */}
        <div>
          <h2 className="text-xl font-bold mb-3">Contato</h2>
          <div className="flex items-start gap-2 text-gray-300 mb-2">
            <FaClock className="mt-1" />
            <span>Ter a Dom 17 às 23h</span>
          </div>
          <div className="flex items-start gap-2 text-gray-300 mb-2">
            <FaPhoneAlt className="mt-1" />
            <span>88 991234567</span>
          </div>
          <div className="flex items-start gap-2 text-gray-300">
            <FaEnvelope className="mt-1" />
            <span>email@food</span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-600 mt-12 pt-6 text-center text-gray-400 text-xs">
        © 2024 FoodBusiness. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
