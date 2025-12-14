import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

type Room = {
  id: number;
  name: string;
  price: number;
  description: string;
  amenities: string[];
  image: string;
};

type Review = {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
};

type GalleryImage = {
  id: number;
  url: string;
  title: string;
};

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const [rooms, setRooms] = useState<Room[]>([
    {
      id: 1,
      name: 'Стандартный номер',
      price: 5000,
      description: 'Уютный номер с видом на город, оснащённый всем необходимым для комфортного отдыха',
      amenities: ['WiFi', 'Кондиционер', 'Телевизор', 'Мини-бар'],
      image: 'https://cdn.poehali.dev/projects/c4be5185-158e-447f-b038-cc71bdc87296/files/591dd891-448f-4e01-b16e-e36a890b3fd4.jpg'
    },
    {
      id: 2,
      name: 'Люкс с видом на океан',
      price: 12000,
      description: 'Просторный люкс с панорамным видом на океан, королевской кроватью и отдельной гостиной',
      amenities: ['WiFi', 'Кондиционер', 'Телевизор', 'Мини-бар', 'Балкон', 'Джакузи'],
      image: 'https://cdn.poehali.dev/projects/c4be5185-158e-447f-b038-cc71bdc87296/files/591dd891-448f-4e01-b16e-e36a890b3fd4.jpg'
    },
    {
      id: 3,
      name: 'Семейный номер',
      price: 8000,
      description: 'Идеальный вариант для семейного отдыха с двумя спальнями и просторной гостиной',
      amenities: ['WiFi', 'Кондиционер', '2 Телевизора', 'Мини-бар', 'Кухонный уголок'],
      image: 'https://cdn.poehali.dev/projects/c4be5185-158e-447f-b038-cc71bdc87296/files/591dd891-448f-4e01-b16e-e36a890b3fd4.jpg'
    }
  ]);

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      name: 'Анна Петрова',
      rating: 5,
      text: 'Прекрасный отель! Невероятный вид, отличный сервис, чистые номера. Обязательно вернёмся снова!',
      date: '2024-12-10'
    },
    {
      id: 2,
      name: 'Дмитрий Соколов',
      rating: 5,
      text: 'Отдыхали семьёй, всё понравилось. Особенно бассейн и ресторан. Персонал очень внимательный.',
      date: '2024-12-08'
    },
    {
      id: 3,
      name: 'Елена Морозова',
      rating: 4,
      text: 'Хороший отель для отдыха. Тихое место, красивая природа. Единственный минус - далеко от центра.',
      date: '2024-12-05'
    }
  ]);

  const [gallery, setGallery] = useState<GalleryImage[]>([
    {
      id: 1,
      url: 'https://cdn.poehali.dev/projects/c4be5185-158e-447f-b038-cc71bdc87296/files/d3d2408e-3024-4d36-b1d6-b950e23963df.jpg',
      title: 'Фасад отеля'
    },
    {
      id: 2,
      url: 'https://cdn.poehali.dev/projects/c4be5185-158e-447f-b038-cc71bdc87296/files/93ad0e7e-dbc0-46f9-b952-7c0441f25606.jpg',
      title: 'Бассейн'
    },
    {
      id: 3,
      url: 'https://cdn.poehali.dev/projects/c4be5185-158e-447f-b038-cc71bdc87296/files/591dd891-448f-4e01-b16e-e36a890b3fd4.jpg',
      title: 'Номер люкс'
    },
    {
      id: 4,
      url: 'https://cdn.poehali.dev/projects/c4be5185-158e-447f-b038-cc71bdc87296/files/d3d2408e-3024-4d36-b1d6-b950e23963df.jpg',
      title: 'Терраса'
    }
  ]);

  const updateRoomPrice = (roomId: number, newPrice: number) => {
    setRooms(rooms.map(room => room.id === roomId ? { ...room, price: newPrice } : room));
  };

  const deleteGalleryImage = (imageId: number) => {
    setGallery(gallery.filter(img => img.id !== imageId));
  };

  const addGalleryImage = (url: string, title: string) => {
    const newImage = {
      id: Math.max(...gallery.map(g => g.id)) + 1,
      url,
      title
    };
    setGallery([...gallery, newImage]);
  };

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Ocean View Hotel</h1>
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-600 hover:text-primary transition">Главная</button>
              <button onClick={() => scrollToSection('rooms')} className="text-gray-600 hover:text-primary transition">Номера</button>
              <button onClick={() => scrollToSection('about')} className="text-gray-600 hover:text-primary transition">О отеле</button>
              <button onClick={() => scrollToSection('gallery')} className="text-gray-600 hover:text-primary transition">Галерея</button>
              <button onClick={() => scrollToSection('reviews')} className="text-gray-600 hover:text-primary transition">Отзывы</button>
              <button onClick={() => scrollToSection('contacts')} className="text-gray-600 hover:text-primary transition">Контакты</button>
              <Button onClick={() => setIsAdmin(!isAdmin)} variant={isAdmin ? 'default' : 'outline'} size="sm">
                <Icon name="Settings" size={16} className="mr-2" />
                {isAdmin ? 'Выйти' : 'Админ'}
              </Button>
            </div>
            <Button variant="outline" className="md:hidden">
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        <section id="home" className="relative h-screen">
          <div className="absolute inset-0">
            <img 
              src="https://cdn.poehali.dev/projects/c4be5185-158e-447f-b038-cc71bdc87296/files/d3d2408e-3024-4d36-b1d6-b950e23963df.jpg" 
              alt="Hotel" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <div className="relative h-full flex items-center justify-center text-center px-4">
            <div className="max-w-4xl animate-fade-in">
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Добро пожаловать в<br />Ocean View Hotel
              </h2>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                Роскошный отдых с видом на океан
              </p>
              <Button size="lg" className="text-lg px-8 py-6" onClick={() => scrollToSection('rooms')}>
                Забронировать номер
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </div>
          </div>
        </section>

        <section id="rooms" className="py-24 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Наши номера</h2>
              <p className="text-xl text-gray-600">Выберите идеальный номер для вашего отдыха</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rooms.map(room => (
                <Card key={room.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-64">
                    <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-2xl">{room.name}</CardTitle>
                      {isAdmin && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Icon name="Pencil" size={16} />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Изменить цену</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label>Новая цена (₽)</Label>
                                <Input 
                                  type="number" 
                                  defaultValue={room.price}
                                  onChange={(e) => updateRoomPrice(room.id, Number(e.target.value))}
                                />
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                    <CardDescription>{room.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {room.amenities.map((amenity, idx) => (
                        <Badge key={idx} variant="secondary">{amenity}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-3xl font-bold text-primary">{room.price} ₽</span>
                        <span className="text-gray-600"> / ночь</span>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button onClick={() => setSelectedRoom(room)}>Забронировать</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Бронирование номера</DialogTitle>
                            <DialogDescription>{room.name}</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label>Дата заезда</Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button variant="outline" className="w-full justify-start text-left">
                                    <Icon name="Calendar" size={16} className="mr-2" />
                                    {dateFrom ? format(dateFrom, 'PPP', { locale: ru }) : 'Выберите дату'}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} />
                                </PopoverContent>
                              </Popover>
                            </div>
                            <div>
                              <Label>Дата выезда</Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button variant="outline" className="w-full justify-start text-left">
                                    <Icon name="Calendar" size={16} className="mr-2" />
                                    {dateTo ? format(dateTo, 'PPP', { locale: ru }) : 'Выберите дату'}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar mode="single" selected={dateTo} onSelect={setDateTo} />
                                </PopoverContent>
                              </Popover>
                            </div>
                            <div>
                              <Label>Имя</Label>
                              <Input placeholder="Ваше имя" />
                            </div>
                            <div>
                              <Label>Телефон</Label>
                              <Input placeholder="+7 (999) 999-99-99" />
                            </div>
                            <div>
                              <Label>Email</Label>
                              <Input type="email" placeholder="your@email.com" />
                            </div>
                            <Button className="w-full">Подтвердить бронирование</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-24 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">О нашем отеле</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Ocean View Hotel — это роскошный отель на берегу океана, где современный дизайн сочетается 
                  с непревзойдённым сервисом. Мы предлагаем нашим гостям незабываемый отдых в атмосфере 
                  спокойствия и комфорта.
                </p>
                <p className="text-lg text-gray-700 mb-8">
                  Наш отель оснащён всем необходимым для идеального отпуска: панорамные виды на океан, 
                  бесконечный бассейн, фитнес-центр, спа-салон и ресторан с изысканной кухней.
                </p>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <Icon name="Home" size={32} className="mx-auto mb-2 text-primary" />
                    <div className="text-3xl font-bold">120</div>
                    <div className="text-gray-600">Номеров</div>
                  </div>
                  <div className="text-center">
                    <Icon name="Star" size={32} className="mx-auto mb-2 text-primary" />
                    <div className="text-3xl font-bold">4.9</div>
                    <div className="text-gray-600">Рейтинг</div>
                  </div>
                  <div className="text-center">
                    <Icon name="Users" size={32} className="mx-auto mb-2 text-primary" />
                    <div className="text-3xl font-bold">5K+</div>
                    <div className="text-gray-600">Гостей</div>
                  </div>
                </div>
              </div>
              <div className="relative h-96 md:h-full min-h-[400px]">
                <img 
                  src="https://cdn.poehali.dev/projects/c4be5185-158e-447f-b038-cc71bdc87296/files/93ad0e7e-dbc0-46f9-b952-7c0441f25606.jpg" 
                  alt="Pool" 
                  className="w-full h-full object-cover rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="gallery" className="py-24 px-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-16">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Галерея</h2>
                <p className="text-xl text-gray-600">Взгляните на наш отель</p>
              </div>
              {isAdmin && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Icon name="Plus" size={16} className="mr-2" />
                      Добавить фото
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Добавить изображение</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>URL изображения</Label>
                        <Input id="new-image-url" placeholder="https://..." />
                      </div>
                      <div>
                        <Label>Название</Label>
                        <Input id="new-image-title" placeholder="Название фото" />
                      </div>
                      <Button 
                        className="w-full"
                        onClick={() => {
                          const url = (document.getElementById('new-image-url') as HTMLInputElement).value;
                          const title = (document.getElementById('new-image-title') as HTMLInputElement).value;
                          if (url && title) {
                            addGalleryImage(url, title);
                          }
                        }}
                      >
                        Добавить
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.map(image => (
                <div key={image.id} className="relative group overflow-hidden rounded-lg aspect-[4/3]">
                  <img src={image.url} alt={image.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="text-center text-white">
                      <p className="text-lg font-semibold">{image.title}</p>
                      {isAdmin && (
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          className="mt-4"
                          onClick={() => deleteGalleryImage(image.id)}
                        >
                          <Icon name="Trash" size={16} className="mr-2" />
                          Удалить
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="reviews" className="py-24 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Отзывы гостей</h2>
              <p className="text-xl text-gray-600">Что говорят о нас наши гости</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {reviews.map(review => (
                <Card key={review.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-xl">{review.name}</CardTitle>
                      <div className="flex">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Icon key={i} name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                    </div>
                    <CardDescription>{review.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{review.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="contacts" className="py-24 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Контакты</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Icon name="MapPin" size={24} className="text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Адрес</h3>
                      <p className="text-gray-600">ул. Океанская, д. 1, г. Владивосток, 690000</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Icon name="Phone" size={24} className="text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Телефон</h3>
                      <p className="text-gray-600">+7 (423) 123-45-67</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Icon name="Mail" size={24} className="text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email</h3>
                      <p className="text-gray-600">info@oceanview-hotel.ru</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Icon name="Clock" size={24} className="text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Режим работы</h3>
                      <p className="text-gray-600">Круглосуточно, 24/7</p>
                    </div>
                  </div>
                </div>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Напишите нам</CardTitle>
                  <CardDescription>Мы ответим в ближайшее время</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div>
                      <Label>Имя</Label>
                      <Input placeholder="Ваше имя" />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input type="email" placeholder="your@email.com" />
                    </div>
                    <div>
                      <Label>Сообщение</Label>
                      <Textarea placeholder="Ваше сообщение..." rows={5} />
                    </div>
                    <Button className="w-full">
                      Отправить
                      <Icon name="Send" size={16} className="ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Ocean View Hotel</h3>
          <p className="text-gray-400 mb-6">Роскошный отдых с видом на океан</p>
          <div className="mt-8 text-gray-500 text-sm">
            © 2024 Ocean View Hotel. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;