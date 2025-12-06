import { useState, useEffect } from 'react';
import { SimpleAvatar, SimpleAvatarFallback } from '@/components/SimpleAvatar';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface CallWindowProps {
  chat: {
    name: string;
    avatar: string;
    color: string;
  };
  type: 'video' | 'voice';
  onEnd: () => void;
}

export default function CallWindow({ chat, type, onEnd }: CallWindowProps) {
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-background via-background to-primary/10 flex flex-col items-center justify-center animate-fade-in">
      <div className="absolute inset-0 bg-grid-white/5" />
      
      <div className="relative z-10 text-center mb-8 animate-scale-in">
        <div className="relative inline-block mb-6">
          <SimpleAvatar className="w-32 h-32 border-4 border-primary/30 shadow-2xl">
            <SimpleAvatarFallback className={`${chat.color} text-white text-4xl font-bold`}>
              {chat.name[0]}
            </SimpleAvatarFallback>
          </SimpleAvatar>
          <div className="absolute -inset-4 bg-primary/20 rounded-full animate-pulse-glow" />
        </div>

        <h2 className="text-3xl font-bold mb-2">{chat.name}</h2>
        <p className="text-muted-foreground mb-1">
          {type === 'video' ? 'Видеозвонок' : 'Голосовой звонок'}
        </p>
        <p className="text-2xl font-mono text-primary">{formatTime(duration)}</p>
      </div>

      {type === 'video' && !isCameraOff && (
        <div className="absolute top-4 right-4 w-48 h-36 rounded-2xl bg-card border-2 border-primary/30 overflow-hidden shadow-xl animate-slide-in-right">
          <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
            <Icon name="User" size={48} className="text-muted-foreground" />
          </div>
        </div>
      )}

      <div className="flex gap-4 mt-8">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setIsMuted(!isMuted)}
          className={`
            w-16 h-16 rounded-full transition-all hover:scale-110
            ${isMuted ? 'bg-destructive hover:bg-destructive' : 'bg-muted hover:bg-muted'}
          `}
        >
          <Icon name={isMuted ? 'MicOff' : 'Mic'} size={24} />
        </Button>

        {type === 'video' && (
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsCameraOff(!isCameraOff)}
            className={`
              w-16 h-16 rounded-full transition-all hover:scale-110
              ${isCameraOff ? 'bg-destructive hover:bg-destructive' : 'bg-muted hover:bg-muted'}
            `}
          >
            <Icon name={isCameraOff ? 'VideoOff' : 'Video'} size={24} />
          </Button>
        )}

        <Button
          size="icon"
          onClick={onEnd}
          className="w-16 h-16 rounded-full bg-destructive hover:bg-destructive/90 hover:scale-110 transition-all shadow-lg"
        >
          <Icon name="PhoneOff" size={24} />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          className="w-16 h-16 rounded-full bg-muted hover:bg-muted transition-all hover:scale-110"
        >
          <Icon name="Volume2" size={24} />
        </Button>
      </div>

      <div className="absolute bottom-8 flex gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full bg-muted/50 hover:bg-muted backdrop-blur-sm"
        >
          <Icon name="MessageSquare" size={16} className="mr-2" />
          Чат
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full bg-muted/50 hover:bg-muted backdrop-blur-sm"
        >
          <Icon name="Users" size={16} className="mr-2" />
          Добавить
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full bg-muted/50 hover:bg-muted backdrop-blur-sm"
        >
          <Icon name="Grid" size={16} className="mr-2" />
          Экран
        </Button>
      </div>
    </div>
  );
}