import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const tabs = [
    { id: 'chats', icon: 'MessageCircle', label: 'Чаты' },
    { id: 'contacts', icon: 'Users', label: 'Контакты' },
    { id: 'notifications', icon: 'Bell', label: 'Уведомления' },
    { id: 'settings', icon: 'Settings', label: 'Настройки' },
  ];

  return (
    <div className="w-20 bg-card border-r border-border flex flex-col items-center py-4 gap-4">
      <div className="mb-4">
        <Avatar className="w-12 h-12 border-2 border-primary cursor-pointer hover:scale-110 transition-transform">
          <AvatarImage src="" />
          <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-bold">
            Я
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="flex-1 flex flex-col gap-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            size="icon"
            variant="ghost"
            onClick={() => onTabChange(tab.id)}
            className={`
              w-14 h-14 rounded-2xl transition-all relative
              ${activeTab === tab.id 
                ? 'bg-primary text-white hover:bg-primary shadow-lg scale-110' 
                : 'hover:bg-muted hover:scale-105'}
            `}
          >
            <Icon name={tab.icon as any} size={24} />
            {tab.id === 'notifications' && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-secondary rounded-full flex items-center justify-center text-xs font-bold text-white animate-pulse-glow">
                3
              </div>
            )}
          </Button>
        ))}
      </div>

      <Button
        size="icon"
        variant="ghost"
        className="w-14 h-14 rounded-2xl hover:bg-destructive/10 hover:scale-105 transition-all"
      >
        <Icon name="LogOut" size={24} className="text-destructive" />
      </Button>
    </div>
  );
}
