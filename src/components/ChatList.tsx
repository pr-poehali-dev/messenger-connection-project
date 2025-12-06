import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  color: string;
}

const mockChats: Chat[] = [
  { id: 1, name: 'Александра', avatar: '', lastMessage: 'Привет! Как дела?', time: '12:34', unread: 3, online: true, color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
  { id: 2, name: 'Дмитрий', avatar: '', lastMessage: 'Созвонимся вечером?', time: '11:20', unread: 0, online: true, color: 'bg-gradient-to-br from-blue-500 to-cyan-500' },
  { id: 3, name: 'Команда Design', avatar: '', lastMessage: 'Отправил макеты', time: 'Вчера', unread: 1, online: false, color: 'bg-gradient-to-br from-orange-500 to-red-500' },
  { id: 4, name: 'Мария', avatar: '', lastMessage: 'Спасибо за помощь!', time: 'Вчера', unread: 0, online: false, color: 'bg-gradient-to-br from-green-500 to-emerald-500' },
  { id: 5, name: 'Андрей', avatar: '', lastMessage: 'Видео готово', time: '2 дня', unread: 5, online: true, color: 'bg-gradient-to-br from-violet-500 to-purple-500' },
];

export default function ChatList({ onChatSelect }: { onChatSelect: (chat: Chat) => void }) {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  const handleSelect = (chat: Chat) => {
    setSelectedChat(chat.id);
    onChatSelect(chat);
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-2">
        {mockChats.map((chat, index) => (
          <div
            key={chat.id}
            onClick={() => handleSelect(chat)}
            className={`
              p-4 rounded-2xl cursor-pointer transition-all duration-300
              hover:bg-muted/50 hover:scale-[1.02] hover:shadow-lg
              animate-fade-in
              ${selectedChat === chat.id ? 'bg-muted/80 scale-[1.02]' : ''}
            `}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="w-14 h-14 border-2 border-primary/20">
                  <AvatarImage src={chat.avatar} />
                  <AvatarFallback className={`${chat.color} text-white font-semibold`}>
                    {chat.name[0]}
                  </AvatarFallback>
                </Avatar>
                {chat.online && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse-glow" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-foreground truncate">{chat.name}</h3>
                  <span className="text-xs text-muted-foreground">{chat.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground truncate flex-1">{chat.lastMessage}</p>
                  {chat.unread > 0 && (
                    <Badge className="ml-2 bg-secondary hover:bg-secondary text-white px-2 py-0.5 animate-scale-in">
                      {chat.unread}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
