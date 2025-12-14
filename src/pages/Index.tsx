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
import { useToast } from '@/hooks/use-toast';

type Room = {
  id: number;
  name: string;
  price: number;
  description: string;
  amenities: string[];
  image: string;
  availableRooms: number;
  totalRooms: number;
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

type Booking = {
  id: number;
  roomName: string;
  roomId: number;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  dateFrom: string;
  dateTo: string;
  bookingDate: string;
  status: 'pending' | 'confirmed' | 'cancelled';
};

const Index = () => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminDialog, setShowAdminDialog] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showBookingsDialog, setShowBookingsDialog] = useState(false);

  const [rooms, setRooms] = useState<Room[]>([
    {
      id: 1,
      name: 'Стандартный номер',
      price: 5000,
      description: 'Уютный номер с видом на город, оснащённый всем необходимым для комфортного отдыха',
      amenities: ['WiFi', 'Кондиционер', 'Телевизор', 'Мини-бар'],
      image: 'https://cdn.poehali.dev/projects/c4be5185-158e-447f-b038-cc71bdc87296/files/591dd891-448f-4e01-b16e-e36a890b3fd4.jpg',
      availableRooms: 8,
      totalRooms: 15
    },
    {
      id: 2,
      name: 'Люкс с видом на океан',
      price: 12000,
      description: 'Просторный люкс с панорамным видом на океан, королевской кроватью и отдельной гостиной',
      amenities: ['WiFi', 'Кондиционер', 'Телевизор', 'Мини-бар', 'Балкон', 'Джакузи'],
      image: 'https://cdn.poehali.dev/projects/c4be5185-158e-447f-b038-cc71bdc87296/files/591dd891-448f-4e01-b16e-e36a890b3fd4.jpg',
      availableRooms: 2,
      totalRooms: 5
    },
    {
      id: 3,
      name: 'Семейный номер',
      price: 8000,
      description: 'Идеальный вариант для семейного отдыха с двумя спальнями и просторной гостиной',
      amenities: ['WiFi', 'Кондиционер', '2 Телевизора', 'Мини-бар', 'Кухонный уголок'],
      image: 'https://cdn.poehali.dev/projects/c4be5185-158e-447f-b038-cc71bdc87296/files/591dd891-448f-4e01-b16e-e36a890b3fd4.jpg',
      availableRooms: 5,
      totalRooms: 10
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

  const handleAdminLogin = () => {
    if (adminPassword === 'admin123') {
      setIsAdmin(true);
      setShowAdminDialog(false);
      setAdminPassword('');
      toast({
        title: 'Вход выполнен',
        description: 'Добро пожаловать в панель администратора',
      });
    } else {
      toast({
        title: 'Ошибка входа',
        description: 'Неверный пароль',
        variant: 'destructive',
      });
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    toast({
      title: 'Выход выполнен',
      description: 'Вы вышли из панели администратора',
    });
  };

  const updateRoomPrice = (roomId: number, newPrice: number) => {
    setRooms(rooms.map(room => room.id === roomId ? { ...room, price: newPrice } : room));
    toast({
      title: 'Цена обновлена',
      description: 'Новая цена успешно сохранена',
    });
  };

  const updateRoomInfo = (roomId: number, name: string, description: string, amenities: string, availableRooms?: number, totalRooms?: number) => {
    setRooms(rooms.map(room => 
      room.id === roomId 
        ? { 
            ...room, 
            name, 
            description, 
            amenities: amenities.split(',').map(a => a.trim()),
            ...(availableRooms !== undefined && { availableRooms }),
            ...(totalRooms !== undefined && { totalRooms })
          } 
        : room
    ));
    toast({
      title: 'Информация обновлена',
      description: 'Данные о номере успешно сохранены',
    });
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
    toast({
      title: 'Фото добавлено',
      description: 'Изображение успешно добавлено в галерею',
    });
  };

  const deleteReview = (reviewId: number) => {
    setReviews(reviews.filter(r => r.id !== reviewId));
    toast({
      title: 'Отзыв удалён',
      description: 'Отзыв успешно удалён',
    });
  };

  const handleBooking = () => {
    if (!selectedRoom || !dateFrom || !dateTo || !guestName || !guestPhone || !guestEmail) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, заполните все поля',
        variant: 'destructive',
      });
      return;
    }

    if (selectedRoom.availableRooms === 0) {
      toast({
        title: 'Ошибка',
        description: 'К сожалению, свободных мест нет',
        variant: 'destructive',
      });
      return;
    }

    const newBooking: Booking = {
      id: bookings.length > 0 ? Math.max(...bookings.map(b => b.id)) + 1 : 1,
      roomName: selectedRoom.name,
      roomId: selectedRoom.id,
      guestName,
      guestPhone,
      guestEmail,
      dateFrom: format(dateFrom, 'yyyy-MM-dd'),
      dateTo: format(dateTo, 'yyyy-MM-dd'),
      bookingDate: format(new Date(), 'yyyy-MM-dd HH:mm'),
      status: 'pending'
    };

    setBookings([newBooking, ...bookings]);

    setRooms(rooms.map(room => 
      room.id === selectedRoom.id 
        ? { ...room, availableRooms: room.availableRooms - 1 }
        : room
    ));

    toast({
      title: 'Бронирование успешно!',
      description: `Номер "${selectedRoom.name}" забронирован на ${format(dateFrom, 'dd.MM.yyyy')} - ${format(dateTo, 'dd.MM.yyyy')}`,
    });

    setBookingDialogOpen(false);
    setDateFrom(undefined);
    setDateTo(undefined);
    setGuestName('');
    setGuestPhone('');
    setGuestEmail('');
  };

  const updateBookingStatus = (bookingId: number, status: 'pending' | 'confirmed' | 'cancelled') => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status } : booking
    ));
    
    if (status === 'cancelled') {
      const booking = bookings.find(b => b.id === bookingId);
      if (booking) {
        setRooms(rooms.map(room => 
          room.id === booking.roomId 
            ? { ...room, availableRooms: room.availableRooms + 1 }
            : room
        ));
      }
    }

    toast({
      title: 'Статус обновлён',
      description: `Статус бронирования изменён на "${status === 'confirmed' ? 'Подтверждено' : status === 'cancelled' ? 'Отменено' : 'В ожидании'}"`,
    });
  };

  const deleteBooking = (bookingId: number) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (booking && booking.status !== 'cancelled') {
      setRooms(rooms.map(room => 
        room.id === booking.roomId 
          ? { ...room, availableRooms: room.availableRooms + 1 }
          : room
      ));
    }
    setBookings(bookings.filter(b => b.id !== bookingId));
    toast({
      title: 'Бронирование удалено',
      description: 'Бронирование успешно удалено',
    });
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
              <button onClick={() => scrollToSection('about')} className="text-gray-600 hover:text-primary transition">О отеле</button>
              <button onClick={() => scrollToSection('rooms')} className="text-gray-600 hover:text-primary transition">Номера</button>
              <button onClick={() => scrollToSection('gallery')} className="text-gray-600 hover:text-primary transition">Галерея</button>
              <button onClick={() => scrollToSection('reviews')} className="text-gray-600 hover:text-primary transition">Отзывы</button>
              <button onClick={() => scrollToSection('contacts')} className="text-gray-600 hover:text-primary transition">Контакты</button>
              {isAdmin ? (
                <div className="flex items-center gap-2">
                  <Button onClick={() => setShowBookingsDialog(true)} variant="outline" size="sm">
                    <Icon name="Calendar" size={16} className="mr-2" />
                    Брони ({bookings.length})
                  </Button>
                  <Button onClick={handleAdminLogout} variant="default" size="sm">
                    <Icon name="LogOut" size={16} className="mr-2" />
                    Выйти
                  </Button>
                </div>
              ) : (
                <Dialog open={showAdminDialog} onOpenChange={setShowAdminDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Icon name="Settings" size={16} className="mr-2" />
                      Админ
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-sm">
                    <DialogHeader>
                      <DialogTitle>Вход для администратора</DialogTitle>
                      <DialogDescription>Введите пароль для доступа к панели управления</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Пароль</Label>
                        <Input 
                          type="password" 
                          placeholder="Введите пароль"
                          value={adminPassword}
                          onChange={(e) => setAdminPassword(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
                        />
                      </div>
                      <Button className="w-full" onClick={handleAdminLogin}>
                        Войти
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
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
                              <DialogTitle>Редактировать номер</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label>Название номера</Label>
                                <Input 
                                  id={`room-name-${room.id}`}
                                  defaultValue={room.name}
                                />
                              </div>
                              <div>
                                <Label>Описание</Label>
                                <Textarea 
                                  id={`room-desc-${room.id}`}
                                  defaultValue={room.description}
                                  rows={3}
                                />
                              </div>
                              <div>
                                <Label>Удобства (через запятую)</Label>
                                <Input 
                                  id={`room-amenities-${room.id}`}
                                  defaultValue={room.amenities.join(', ')}
                                />
                              </div>
                              <div>
                                <Label>Цена (₽ / ночь)</Label>
                                <Input 
                                  id={`room-price-${room.id}`}
                                  type="number" 
                                  defaultValue={room.price}
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Свободно мест</Label>
                                  <Input 
                                    id={`room-available-${room.id}`}
                                    type="number" 
                                    min="0"
                                    defaultValue={room.availableRooms}
                                  />
                                </div>
                                <div>
                                  <Label>Всего мест</Label>
                                  <Input 
                                    id={`room-total-${room.id}`}
                                    type="number" 
                                    min="1"
                                    defaultValue={room.totalRooms}
                                  />
                                </div>
                              </div>
                              <Button 
                                className="w-full"
                                onClick={() => {
                                  const name = (document.getElementById(`room-name-${room.id}`) as HTMLInputElement).value;
                                  const description = (document.getElementById(`room-desc-${room.id}`) as HTMLTextAreaElement).value;
                                  const amenities = (document.getElementById(`room-amenities-${room.id}`) as HTMLInputElement).value;
                                  const price = Number((document.getElementById(`room-price-${room.id}`) as HTMLInputElement).value);
                                  const availableRooms = Number((document.getElementById(`room-available-${room.id}`) as HTMLInputElement).value);
                                  const totalRooms = Number((document.getElementById(`room-total-${room.id}`) as HTMLInputElement).value);
                                  updateRoomInfo(room.id, name, description, amenities, availableRooms, totalRooms);
                                  updateRoomPrice(room.id, price);
                                }}
                              >
                                Сохранить изменения
                              </Button>
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
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Свободно мест:</span>
                        <span className={`font-semibold ${room.availableRooms <= 3 ? 'text-red-600' : 'text-green-600'}`}>
                          {room.availableRooms} из {room.totalRooms}
                        </span>
                      </div>
                      {room.availableRooms <= 3 && (
                        <div className="mt-2 flex items-center gap-1 text-xs text-red-600">
                          <Icon name="AlertCircle" size={14} />
                          <span>Осталось мало мест!</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-3xl font-bold text-primary">{room.price} ₽</span>
                        <span className="text-gray-600"> / ночь</span>
                      </div>
                      <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
                        <DialogTrigger asChild>
                          <Button 
                            onClick={() => {
                              setSelectedRoom(room);
                              setBookingDialogOpen(true);
                            }}
                            disabled={room.availableRooms === 0}
                          >
                            {room.availableRooms === 0 ? 'Нет мест' : 'Забронировать'}
                          </Button>
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
                              <Input 
                                placeholder="Ваше имя" 
                                value={guestName}
                                onChange={(e) => setGuestName(e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>Телефон</Label>
                              <Input 
                                placeholder="+7 (999) 999-99-99"
                                value={guestPhone}
                                onChange={(e) => setGuestPhone(e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>Email</Label>
                              <Input 
                                type="email" 
                                placeholder="your@email.com"
                                value={guestEmail}
                                onChange={(e) => setGuestEmail(e.target.value)}
                              />
                            </div>
                            <Button className="w-full" onClick={handleBooking}>
                              Подтвердить бронирование
                            </Button>
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
                <Card key={review.id} className="relative">
                  {isAdmin && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 z-10"
                      onClick={() => deleteReview(review.id)}
                    >
                      <Icon name="Trash2" size={16} className="text-red-500" />
                    </Button>
                  )}
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

      <Dialog open={showBookingsDialog} onOpenChange={setShowBookingsDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>История бронирований</DialogTitle>
            <DialogDescription>Всего бронирований: {bookings.length}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {bookings.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Icon name="Calendar" size={48} className="mx-auto mb-4 opacity-50" />
                <p>Пока нет бронирований</p>
              </div>
            ) : (
              bookings.map(booking => (
                <Card key={booking.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{booking.roomName}</h3>
                          <Badge variant={
                            booking.status === 'confirmed' ? 'default' : 
                            booking.status === 'cancelled' ? 'destructive' : 
                            'secondary'
                          }>
                            {booking.status === 'confirmed' ? 'Подтверждено' : 
                             booking.status === 'cancelled' ? 'Отменено' : 
                             'В ожидании'}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Гость:</span>
                            <p className="font-medium">{booking.guestName}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Телефон:</span>
                            <p className="font-medium">{booking.guestPhone}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Email:</span>
                            <p className="font-medium">{booking.guestEmail}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Даты:</span>
                            <p className="font-medium">
                              {format(new Date(booking.dateFrom), 'dd.MM.yyyy')} - {format(new Date(booking.dateTo), 'dd.MM.yyyy')}
                            </p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Забронировано: {booking.bookingDate}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        {booking.status === 'pending' && (
                          <Button 
                            size="sm" 
                            onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                          >
                            <Icon name="Check" size={16} className="mr-1" />
                            Подтвердить
                          </Button>
                        )}
                        {booking.status !== 'cancelled' && (
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                          >
                            <Icon name="X" size={16} className="mr-1" />
                            Отменить
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => deleteBooking(booking.id)}
                        >
                          <Icon name="Trash2" size={16} className="mr-1" />
                          Удалить
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;