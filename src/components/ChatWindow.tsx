import { useState } from 'react';
import { SimpleAvatar, SimpleAvatarFallback } from '@/components/SimpleAvatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SimpleScrollArea } from '@/components/SimpleScrollArea';
import Icon from '@/components/ui/icon';

interface Message {
  id: number;
  text: string;
  time: string;
  isMine: boolean;
}

interface ChatWindowProps {
  chat: {
    name: string;
    avatar: string;
    online: boolean;
    color: string;
  } | null;
  onVideoCall: () => void;
  onVoiceCall: () => void;
}

export default function ChatWindow({ chat, onVideoCall, onVoiceCall }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Привет! Как дела?', time: '12:30', isMine: false },
    { id: 2, text: 'Отлично! Спасибо, что спросил 😊', time: '12:32', isMine: true },
    { id: 3, text: 'Можем созвониться?', time: '12:33', isMine: false },
    { id: 4, text: 'Конечно! Звони', time: '12:34', isMine: true },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: messages.length + 1,
      text: newMessage,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      isMine: true,
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };

  if (!chat) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Icon name="MessageCircle" size={48} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Выберите чат</h2>
          <p className="text-muted-foreground">Начните общение с друзьями</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <SimpleAvatar className="w-12 h-12 border-2 border-primary/20">
                <SimpleAvatarFallback className={`${chat.color} text-white font-semibold`}>
                  {chat.name[0]}
                </SimpleAvatarFallback>
              </SimpleAvatar>
              {chat.online && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse-glow" />
              )}
            </div>
            <div>
              <h2 className="font-bold text-lg">{chat.name}</h2>
              <p className="text-xs text-muted-foreground">
                {chat.online ? 'В сети' : 'Был(а) недавно'}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full hover:bg-accent hover:scale-110 transition-all"
              onClick={onVoiceCall}
            >
              <Icon name="Phone" size={20} />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full hover:bg-accent hover:scale-110 transition-all"
              onClick={onVideoCall}
            >
              <Icon name="Video" size={20} />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full hover:bg-accent hover:scale-110 transition-all"
            >
              <Icon name="MoreVertical" size={20} />
            </Button>
          </div>
        </div>
      </div>

      <SimpleScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex ${message.isMine ? 'justify-end' : 'justify-start'} animate-fade-in`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div
                className={`
                  max-w-[70%] rounded-2xl p-3 shadow-md
                  ${message.isMine 
                    ? 'bg-gradient-to-br from-primary to-primary/80 text-white rounded-br-md' 
                    : 'bg-card rounded-bl-md'}
                `}
              >
                <p className="text-sm break-words">{message.text}</p>
                <span className={`text-xs ${message.isMine ? 'text-white/70' : 'text-muted-foreground'} mt-1 block`}>
                  {message.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </SimpleScrollArea>

      <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full hover:bg-accent hover:scale-110 transition-all"
          >
            <Icon name="Paperclip" size={20} />
          </Button>
          
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Введите сообщение..."
            className="flex-1 rounded-full bg-muted border-0 focus-visible:ring-2 focus-visible:ring-primary"
          />

          <Button
            size="icon"
            variant="ghost"
            className="rounded-full hover:bg-accent hover:scale-110 transition-all"
          >
            <Icon name="Smile" size={20} />
          </Button>

          <Button
            size="icon"
            onClick={handleSend}
            className="rounded-full bg-gradient-to-br from-primary to-secondary hover:scale-110 transition-all shadow-lg"
          >
            <Icon name="Send" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}