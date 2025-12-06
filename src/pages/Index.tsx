import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ChatList from '@/components/ChatList';
import ChatWindow from '@/components/ChatWindow';
import CallWindow from '@/components/CallWindow';
import { Input } from '@/components/ui/input';
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

const Index = () => {
  const [activeTab, setActiveTab] = useState('chats');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [callState, setCallState] = useState<{ active: boolean; type: 'video' | 'voice' } | null>(null);

  const handleVideoCall = () => {
    if (selectedChat) {
      setCallState({ active: true, type: 'video' });
    }
  };

  const handleVoiceCall = () => {
    if (selectedChat) {
      setCallState({ active: true, type: 'voice' });
    }
  };

  const handleEndCall = () => {
    setCallState(null);
  };

  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'chats' && (
        <>
          <div className="w-96 border-r border-border bg-card flex flex-col">
            <div className="p-4 border-b border-border">
              <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Мессенджер
              </h1>
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск чатов..."
                  className="pl-10 rounded-full bg-muted border-0 focus-visible:ring-2 focus-visible:ring-primary"
                />
              </div>
            </div>
            <ChatList onChatSelect={setSelectedChat} />
          </div>

          <div className="flex-1 bg-background">
            <ChatWindow
              chat={selectedChat}
              onVideoCall={handleVideoCall}
              onVoiceCall={handleVoiceCall}
            />
          </div>
        </>
      )}

      {activeTab === 'contacts' && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center animate-fade-in">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
              <Icon name="Users" size={48} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Контакты</h2>
            <p className="text-muted-foreground">Здесь будут ваши контакты</p>
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center animate-fade-in">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center animate-pulse-glow">
              <Icon name="Bell" size={48} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Уведомления</h2>
            <p className="text-muted-foreground">У вас 3 новых уведомления</p>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center animate-fade-in">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="Settings" size={48} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Настройки</h2>
            <p className="text-muted-foreground">Персонализируйте свой мессенджер</p>
          </div>
        </div>
      )}

      {callState?.active && selectedChat && (
        <CallWindow
          chat={selectedChat}
          type={callState.type}
          onEnd={handleEndCall}
        />
      )}
    </div>
  );
};

export default Index;
