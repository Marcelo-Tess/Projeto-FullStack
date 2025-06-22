import burguer from '../../assets/burguer.png'
import pizza from '../../assets/pizza.png'

const Categories = () => {
  const items = [
    { name: "PIZZA", image: pizza },
    { name: "PIZZA", image: pizza },
    { name: "HAMBURGUER", image: burguer },
  ];

  return (
    <div className="flex overflow-x-auto gap-4 py-4 pl-0">
      {items.map((item, index) => (
        <div key={index} className="min-w-[150px] rounded-lg overflow-hidden shadow">
          <img src={item.image} alt={item.name} className="w-full h-24 object-cover" />
          <div className="bg-white text-center py-2 font-semibold">{item.name}</div>
        </div>
      ))}
    </div>
  )
}

export default Categories;
