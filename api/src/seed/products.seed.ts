import { MongoClient } from 'mongodb';

const products = [
  {
    name: 'Яблоки Голден',
    price: 89.99,
    category: 'Фрукты',
    description: 'Свежие яблоки сорта Голден, выращенные в экологически чистом районе',
    quantity: 150
  },
  {
    name: 'Молоко 3.2%',
    price: 79.99,
    category: 'Молочные продукты',
    description: 'Пастеризованное молоко высшего сорта',
    quantity: 100
  },
  {
    name: 'Хлеб белый',
    price: 45.50,
    category: 'Хлебобулочные изделия',
    description: 'Свежий белый хлеб из пшеничной муки высшего сорта',
    quantity: 80
  },
  {
    name: 'Сыр Российский',
    price: 459.99,
    category: 'Молочные продукты',
    description: 'Полутвердый сыр, изготовленный по классической технологии',
    quantity: 50
  },
  {
    name: 'Бананы',
    price: 99.99,
    category: 'Фрукты',
    description: 'Спелые бананы из Эквадора',
    quantity: 200
  },
  {
    name: 'Картофель',
    price: 49.99,
    category: 'Овощи',
    description: 'Свежий картофель нового урожая',
    quantity: 300
  },
  {
    name: 'Морковь',
    price: 39.99,
    category: 'Овощи',
    description: 'Сочная морковь местного производства',
    quantity: 250
  },
  {
    name: 'Йогурт натуральный',
    price: 69.99,
    category: 'Молочные продукты',
    description: 'Натуральный йогурт без добавок',
    quantity: 120
  },
  {
    name: 'Огурцы',
    price: 159.99,
    category: 'Овощи',
    description: 'Свежие тепличные огурцы',
    quantity: 180
  },
  {
    name: 'Помидоры',
    price: 199.99,
    category: 'Овощи',
    description: 'Спелые томаты',
    quantity: 160
  },
  {
    name: 'Апельсины',
    price: 129.99,
    category: 'Фрукты',
    description: 'Сочные апельсины из Марокко',
    quantity: 140
  },
  {
    name: 'Творог 9%',
    price: 159.99,
    category: 'Молочные продукты',
    description: 'Свежий творог из отборного молока',
    quantity: 90
  },
  {
    name: 'Батон нарезной',
    price: 42.99,
    category: 'Хлебобулочные изделия',
    description: 'Классический нарезной батон',
    quantity: 70
  },
  {
    name: 'Лук репчатый',
    price: 29.99,
    category: 'Овощи',
    description: 'Репчатый лук высшего сорта',
    quantity: 220
  },
  {
    name: 'Мандарины',
    price: 149.99,
    category: 'Фрукты',
    description: 'Сладкие мандарины без косточек',
    quantity: 170
  },
  {
    name: 'Сметана 20%',
    price: 89.99,
    category: 'Молочные продукты',
    description: 'Натуральная сметана из свежих сливок',
    quantity: 110
  },
  {
    name: 'Капуста',
    price: 44.99,
    category: 'Овощи',
    description: 'Свежая белокочанная капуста',
    quantity: 190
  },
  {
    name: 'Груши',
    price: 169.99,
    category: 'Фрукты',
    description: 'Сочные груши сорта Конференция',
    quantity: 130
  },
  {
    name: 'Кефир 3.2%',
    price: 75.99,
    category: 'Молочные продукты',
    description: 'Свежий кефир из натурального молока',
    quantity: 95
  },
  {
    name: 'Багет французский',
    price: 59.99,
    category: 'Хлебобулочные изделия',
    description: 'Хрустящий багет по французскому рецепту',
    quantity: 60
  }
];

async function seed() {
  const client = new MongoClient('mongodb://localhost:27017');
  
  try {
    await client.connect();
    const db = client.db('food-products');
    const collection = db.collection('products');
    
    // Очищаем коллекцию перед заполнением
    await collection.deleteMany({});
    
    // Вставляем тестовые данные
    const result = await collection.insertMany(products);
    console.log(`Успешно добавлено ${result.insertedCount} продуктов`);
  } catch (error) {
    console.error('Ошибка при заполнении базы данных:', error);
  } finally {
    await client.close();
  }
}

seed(); 