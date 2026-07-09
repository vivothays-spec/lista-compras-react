import  { useState } from 'react';
import './App.css';

// Lista de produtos para gerar aleatoriamente
const PRODUCTS_DATABASE = [
  'Arroz', 'Feijão', 'Macarrão', 'Leite', 'Ovos',
  'Pão', 'Manteiga', 'Queijo', 'Presunto', 'Frango',
  'Carne Moída', 'Peixe', 'Batata', 'Cebola', 'Alho',
  'Tomate', 'Alface', 'Banana', 'Maçã', 'Laranja',
  'Café', 'Açúcar', 'Sal', 'Óleo', 'Vinagre',
  'Shampoo', 'Condicionador', 'Sabonete', 'Detergente', 'Amaciante'
];

// Função para obter produtos aleatórios
const getRandomProducts = (count) => {
  const shuffled = [...PRODUCTS_DATABASE].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((name, index) => ({
    id: Date.now() + index,
    name,
    purchased: false,
    quantity: Math.floor(Math.random() * 5) + 1
  }));
};

function App() {
  const [products, setProducts] = useState(() => getRandomProducts(20));

  // Alternar status de comprado
  const togglePurchased = (id) => {
    setProducts(products.map(product =>
      product.id === id
        ? { ...product, purchased: !product.purchased }
        : product
    ));
  };

  // Remover produto
  const removeProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  // Gerar nova lista
  const regenerateList = () => {
    setProducts(getRandomProducts(20));
  };

  // Contador de itens comprados
  const purchasedCount = products.filter(p => p.purchased).length;

  return (
    <div className="container">
      <h1>🛒 Lista de Compras</h1>

      <div className="header-actions">
        <span className="item-counter">
          {products.length} itens | {purchasedCount} comprados
        </span>
        <button className="btn-new-list" onClick={regenerateList}>
          🔄 Nova Lista
        </button>
      </div>

      {products.length === 0 ? (
        <p className="empty-message">
          Lista vazia. Clique em "Nova Lista" para gerar produtos.
        </p>
      ) : (
        <ul className="product-list">
          {products.map((product) => (
            <li
              key={product.id}
              className={`product-item ${product.purchased ? 'purchased' : ''}`}
            >
              <div className="product-info">
                <input
                  type="checkbox"
                  checked={product.purchased}
                  onChange={() => togglePurchased(product.id)}
                  className="product-checkbox"
                />
                <span className="product-name">
                  {product.name}
                </span>
                <span className="product-quantity">
                  {product.quantity}x
                </span>
              </div>
              <button
                onClick={() => removeProduct(product.id)}
                className="btn-remove"
                title="Remover item"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      <footer className="footer">
        Clique no checkbox para marcar como comprado • ✕ para remover
      </footer>
    </div>
  );
}

export default App;